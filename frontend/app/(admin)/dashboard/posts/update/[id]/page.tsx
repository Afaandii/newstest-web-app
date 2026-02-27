import { use, useEffect, useState } from "react";
import { Body } from "@/components/layout";
import { Layout } from "@/components/layout";
import { PostForm } from "../../post-form";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UpdatePostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/v1/posts/${id}`);
        const result = await response.json();
        if (result.status === "success") {
          setPost(result.data);
        } else {
          setError(result.error || "Post not found");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Body>
          <div className="text-center py-20 text-muted-foreground">
            Loading post data...
          </div>
        </Body>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <Body>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">{error || "Post not found"}</h2>
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
            id={post.id_post.toString()} 
            initialData={{
              title: post.title,
              category_id: post.category_id.toString(),
              excerpt: post.excerpt,
              content: post.content,
              thumbnail_url: post.thumbnail,
            }} 
          />
        </div>
      </Body>
    </Layout>
  );
}
