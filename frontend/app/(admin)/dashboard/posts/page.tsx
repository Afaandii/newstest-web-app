"use client";

import { useState } from "react";
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

// Dummy data
const initialPosts = [
  { 
    id: "1", 
    title: "Breaking: Latest AI Technology 2026", 
    slug: "breaking-latest-ai-technology-2026",
    category: "Technology",
    author: "Admin Afandi",
    date: "25 Feb 2026",
    thumbnail: null // Placeholder
  },
  { 
    id: "2", 
    title: "Market Trends and Financial News", 
    slug: "market-trends-and-financial-news",
    category: "Economy",
    author: "Editor",
    date: "24 Feb 2026",
    thumbnail: null
  },
  { 
    id: "3", 
    title: "Environment and Global Warming", 
    slug: "environment-and-global-warming",
    category: "Nature",
    author: "Contributor",
    date: "23 Feb 2026",
    thumbnail: null
  },
];

export default function PostsPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
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
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id} className="group">
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
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {post.author}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                        {post.date}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild className="size-8">
                            <Link href={`/dashboard/posts/update/${post.id}`}>
                              <HiOutlinePencilSquare className="size-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(post.id)}
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
