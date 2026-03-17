"use client";

import { useState, useEffect, useCallback } from "react";
import { ThumbsUp, MessageCircle, Flag, Loader2, LogIn } from "lucide-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { Comment, getComments, createComment, toggleLikeComment, User } from "@/lib/news";
import { Button } from "@/components/ui/button"; // Assuming Button component is from a UI library

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  onReply: (parentId: number, authorName: string) => void;
  currentUserId?: number;
}

function CommentItem({ comment, isReply = false, onReply, currentUserId }: CommentItemProps) {
  const [liked, setLiked] = useState(comment.is_liked || false);
  const [likeCount, setLikeCount] = useState(comment.likes_count);
  const [isLiking, setIsLiking] = useState(false);

  // Update liked state if comment changes (optional but helps when data reloads)
  useEffect(() => {
    setLiked(comment.is_liked || false);
    setLikeCount(comment.likes_count);
  }, [comment.is_liked, comment.likes_count]);

  const handleLike = async () => {
    if (!currentUserId || isLiking) return;
    setIsLiking(true);
    const status = await toggleLikeComment(comment.id_comment, currentUserId);
    if (status === "liked") {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else if (status === "unliked") {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    }
    setIsLiking(false);
  };

  const getInitials = (name: string) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) || "?";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Baru saja";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    return date.toLocaleDateString("id-ID");
  };

  return (
    <div className={`${isReply ? "ml-6 md:ml-10 pl-4 border-l-2 border-gray-100" : ""}`}>
      <div className="flex gap-3 py-4">
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-[#1a1a1a] ${isReply ? "text-[10px]" : "md:w-10 md:h-10 text-xs"}`}
        >
          {getInitials(comment.User?.name || "User")}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-[#1a1a1a] font-sans">
              {comment.User?.name || "Anonim"}
            </span>
            <span className="text-[11px] text-gray-400 font-sans">
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-serif">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleLike}
              disabled={isLiking || !currentUserId}
              className={`flex items-center gap-1.5 text-xs font-sans transition-colors ${
                liked ? "text-[#c41e2f]" : "text-gray-400 hover:text-gray-600"
              } disabled:opacity-50`}
            >
              <ThumbsUp size={13} className={liked ? "fill-[#c41e2f]" : ""} />
              <span>{likeCount}</span>
            </button>
            <button 
              onClick={() => onReply(comment.id_comment, comment.User?.name || "User")}
              disabled={!currentUserId}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors font-sans disabled:opacity-50"
            >
              <MessageCircle size={13} />
              <span>Balas</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors font-sans">
              <Flag size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-1">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id_comment} 
              comment={reply} 
              isReply 
              onReply={onReply} 
              currentUserId={currentUserId} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentsSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<{ id: number; name: string } | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return;

      const response = await fetch("http://localhost:8080/v1/auth/me", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setCurrentUser(result.data);
      } else {
        setCurrentUser(null); // Clear user if token is invalid or expired
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setCurrentUser(null);
    }
  }, []);

  const fetchCommentsForPost = useCallback(async () => {
    setLoading(true);
    const data = await getComments(postId, currentUser?.id_user);
    
    // Nest comments
    const commentMap = new Map<number, Comment>();
    const rootComments: Comment[] = [];
    
    // First pass: create map and identify roots
    data.forEach(c => {
      commentMap.set(c.id_comment, { ...c, replies: [] });
    });
    
    data.forEach(c => {
      const mapped = commentMap.get(c.id_comment)!;
      if (c.parent_id && commentMap.has(c.parent_id)) {
        commentMap.get(c.parent_id)!.replies!.push(mapped);
      } else {
        rootComments.push(mapped);
      }
    });
    
    setComments(rootComments);
    setLoading(false);
  }, [postId, currentUser?.id_user]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    fetchCommentsForPost();
  }, [fetchCommentsForPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting || !currentUser) return;

    setIsSubmitting(true);
    const newComment = await createComment(postId, {
      user_id: currentUser.id_user,
      content: content.trim(),
      parent_id: replyTo?.id || undefined
    });

    if (newComment) {
      setContent("");
      setReplyTo(null);
      await fetchCommentsForPost(); // Reload to show new comment with full user data
    }
    setIsSubmitting(false);
  };

  const handleReplyClick = (parentId: number, authorName: string) => {
    setReplyTo({ id: parentId, name: authorName });
    // Scroll to input
    const inputElement = document.getElementById("comment-input");
    inputElement?.scrollIntoView({ behavior: "smooth" });
    inputElement?.focus();
  };

  const totalCommentsCount = (list: Comment[]): number => {
    return list.reduce((acc, c) => acc + 1 + totalCommentsCount(c.replies || []), 0);
  };

  const totalCount = totalCommentsCount(comments);

  const getInitials = (name: string) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) || "?";
  };

  return (
    <section className="mt-10 pt-8 border-t-2 border-[#1a1a1a]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-xl font-bold text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Komentar{" "}
          <span className="text-sm font-normal text-gray-400 font-sans ml-1">
            ({totalCount})
          </span>
        </h3>
      </div>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="mb-10 pb-6 border-b border-gray-200">
        {replyTo && (
          <div className="flex items-center justify-between bg-gray-50 px-3 py-2 mb-3 rounded border-l-4 border-[#c41e2f]">
            <span className="text-xs text-gray-600">
              Membalas <span className="font-bold">{replyTo.name}</span>
            </span>
            <button 
              type="button" 
              onClick={() => setReplyTo(null)}
              className="text-[10px] uppercase font-bold text-gray-400 hover:text-gray-600"
            >
              Batal
            </button>
          </div>
        )}
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gray-300">
            ?
          </div>
          <div className="flex-1">
            <textarea
              id="comment-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={replyTo ? `Balas ${replyTo.name}...` : "Tulis komentar Anda..."}
              className="w-full px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors resize-none font-serif"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button 
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#333] transition-colors font-sans disabled:opacity-50"
              >
                {isSubmitting && <Loader2 size={12} className="animate-spin" />}
                {replyTo ? "Kirim Balasan" : "Kirim Komentar"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-2">
        {loading ? (
          <div className="flex justify-center py-10 text-gray-400">
            <Loader2 className="animate-spin" />
          </div>
        ) : comments.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {comments.map((comment) => (
              <CommentItem 
                key={comment.id_comment} 
                comment={comment} 
                onReply={handleReplyClick} 
                currentUserId={currentUser?.id_user}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400 font-sans text-sm">
            Belum ada komentar. Jadilah yang pertama berkomentar!
          </div>
        )}
      </div>
    </section>
  );
}
