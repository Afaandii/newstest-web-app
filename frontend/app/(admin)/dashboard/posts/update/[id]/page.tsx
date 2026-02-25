"use client";

import { use } from "react";
import { Body } from "@/components/layout";
import { Layout } from "@/components/layout";
import { PostForm } from "../../post-form";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dummy data for finding post
const initialPosts = [
  { 
    id: "1", 
    title: "Breaking: Latest AI Technology 2026", 
    slug: "breaking-latest-ai-technology-2026",
    category_id: "1",
    excerpt: "This is a dummy excerpt for the AI post.",
    content: "This is the full content for the latest AI technology news of 2026. Next.js and Tailwind are amazing.",
  },
  { 
    id: "2", 
    title: "Market Trends and Financial News", 
    slug: "market-trends-and-financial-news",
    category_id: "2",
    excerpt: "Dummy excerpt for financial news.",
    content: "Detailed market analysis for 2026 including crypto and stock updates.",
  }
];

export default function UpdatePostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const post = initialPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <Layout>
        <Body>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Post not found</h2>
            <p className="text-muted-foreground mt-2">The article you are looking for does not exist.</p>
            <Button asChild className="mt-6">
              <Link href="/dashboard/posts">Back to Posts</Link>
            </Button>
          </div>
        </Body>
      </Layout>
    );
  }

  return (
    <Layout>
      <Body className="space-y-6">
        <div className="flex flex-col gap-4">
          <Button variant="ghost" size="sm" asChild className="w-fit -ml-2 text-muted-foreground">
            <Link href="/dashboard/posts" className="flex items-center gap-1">
              <HiOutlineChevronLeft className="size-4" /> Back to Posts
            </Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
            <p className="text-muted-foreground mt-1">
              Update the details for "{post.title}".
            </p>
          </div>
        </div>

        <div className="p-8 border rounded-xl bg-card shadow-sm">
          <PostForm 
            id={post.id} 
            initialData={{
              title: post.title,
              slug: post.slug,
              category_id: post.category_id,
              excerpt: post.excerpt,
              content: post.content,
            }} 
          />
        </div>
      </Body>
    </Layout>
  );
}
