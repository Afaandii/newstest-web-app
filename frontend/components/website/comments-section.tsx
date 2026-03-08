"use client";

import { useState } from "react";
import { ThumbsUp, MessageCircle, Flag } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  replies?: Comment[];
}

const dummyComments: Comment[] = [
  {
    id: "c1",
    author: "Budi Setiawan",
    avatar: "BS",
    date: "2 jam lalu",
    content:
      "Artikel yang sangat informatif! Saya setuju bahwa perkembangan di bidang ini akan berdampak besar bagi masa depan Indonesia. Semoga pemerintah dan masyarakat bisa bekerja sama untuk memaksimalkan potensinya.",
    likes: 24,
    replies: [
      {
        id: "c1r1",
        author: "Rina Kartika",
        avatar: "RK",
        date: "1 jam lalu",
        content:
          "Setuju, Pak Budi! Kolaborasi antara sektor publik dan swasta memang sangat penting dalam hal ini.",
        likes: 8,
      },
    ],
  },
  {
    id: "c2",
    author: "Diana Putri",
    avatar: "DP",
    date: "3 jam lalu",
    content:
      "Terima kasih sudah mengangkat topik ini. Jarang sekali media memberikan ulasan yang komprehensif seperti ini. Ditunggu artikel lanjutannya!",
    likes: 15,
  },
  {
    id: "c3",
    author: "Agus Firmansyah",
    avatar: "AF",
    date: "5 jam lalu",
    content:
      "Menarik sekali perspektif yang disampaikan di artikel ini. Sebagai praktisi di bidang terkait, saya bisa konfirmasi bahwa perkembangan ini memang sangat pesat dan penuh peluang.",
    likes: 31,
    replies: [
      {
        id: "c3r1",
        author: "Siti Nurhaliza",
        avatar: "SN",
        date: "4 jam lalu",
        content:
          "Wah, senang mendengar langsung dari praktisi! Apakah menurut Bapak tantangan terbesar saat ini apa?",
        likes: 5,
      },
      {
        id: "c3r2",
        author: "Agus Firmansyah",
        avatar: "AF",
        date: "3 jam lalu",
        content:
          "Tantangan utamanya ada di sisi regulasi dan kesiapan SDM. Tapi saya optimis kita bisa mengatasinya dalam beberapa tahun ke depan.",
        likes: 12,
      },
    ],
  },
  {
    id: "c4",
    author: "Lina Marlina",
    avatar: "LM",
    date: "6 jam lalu",
    content:
      "Sudah lama menunggu berita seperti ini. Semoga ini bisa menjadi langkah awal perubahan positif yang lebih besar lagi. Keren, NewsTest!",
    likes: 9,
  },
  {
    id: "c5",
    author: "Hadi Pranoto",
    avatar: "HP",
    date: "8 jam lalu",
    content:
      "Analisis yang tajam. Saya akan share artikel ini ke rekan-rekan. Sangat penting untuk diketahui banyak orang.",
    likes: 18,
  },
];

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className={`${isReply ? "ml-10 pl-4 border-l-2 border-gray-100" : ""}`}>
      <div className="flex gap-3 py-4">
        {/* Avatar */}
        <div
          className={`flex-shrink-0 ${isReply ? "w-8 h-8 text-[10px]" : "w-10 h-10 text-xs"} rounded-full flex items-center justify-center font-bold text-white bg-[#1a1a1a]`}
        >
          {comment.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-[#1a1a1a] font-sans">
              {comment.author}
            </span>
            <span className="text-[11px] text-gray-400 font-sans">
              {comment.date}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-serif">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs font-sans transition-colors ${
                liked ? "text-[#c41e2f]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <ThumbsUp size={13} className={liked ? "fill-[#c41e2f]" : ""} />
              <span>{likeCount}</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors font-sans">
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
        <div>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentsSection() {
  const totalComments =
    dummyComments.length +
    dummyComments.reduce((acc, c) => acc + (c.replies?.length || 0), 0);

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
            ({totalComments})
          </span>
        </h3>
      </div>

      {/* Comment Input */}
      <div className="flex gap-3 mb-8 pb-6 border-b border-gray-200">
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gray-300">
          ?
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Tulis komentar Anda..."
            className="w-full px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors resize-none font-serif"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#333] transition-colors font-sans">
              Kirim Komentar
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-gray-100">
        {dummyComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}
