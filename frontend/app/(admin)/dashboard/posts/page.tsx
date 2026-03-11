"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  HiOutlinePlus, 
  HiOutlinePencilSquare, 
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
  HiOutlinePhoto
} from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout, Body } from "@/components/layout";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/v1/posts");
      const result = await response.json();
      
      if (result.status === "success") {
        setPosts(result.data || []);
      } else {
        setError(result.error || "Failed to fetch posts");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:8080/v1/posts/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        
        if (response.ok) {
          setPosts(posts.filter((post) => post.id_post !== id));
        } else {
          alert(result.errors || "Failed to delete post");
        }
      } catch (err: any) {
        alert(err.message || "An error occurred");
      }
    }
  };

  return (
    <Layout>
      <Body className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
            <p className="text-muted-foreground mt-1">
              Manage your news articles and publications.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/posts/create">
              <HiOutlinePlus className="mr-2 size-4" /> Create Post
            </Link>
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <CardTitle>All Posts</CardTitle>
                <CardDescription>
                  A list of all your published and draft articles.
                </CardDescription>
              </div>
              <div className="relative w-64">
                <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Author</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      Loading posts...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-destructive">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id_post} className="group">
                      <TableCell>
                        <div className="size-12 rounded-md bg-muted flex items-center justify-center overflow-hidden border">
                          {post.thumbnail ? (
                             <Image 
                               src={post.thumbnail} 
                               alt={post.title} 
                               width={48} 
                               height={48} 
                               className="object-cover size-full"
                             />
                          ) : (
                            <HiOutlinePhoto className="size-6 text-muted-foreground/50" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold line-clamp-1">{post.title}</span>
                          <span className="text-xs text-muted-foreground font-mono">{post.slug}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="font-medium bg-primary/5 text-primary border-primary/20">
                          {post.Category?.name || "Uncategorized"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {post.User?.name || "-"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                        {new Date(post.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild className="size-8">
                            <Link href={`/dashboard/posts/update/${post.id_post}`}>
                              <HiOutlinePencilSquare className="size-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(post.id_post)}
                          >
                            <HiOutlineTrash className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No posts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Body>
    </Layout>
  );
}
