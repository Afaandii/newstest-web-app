"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiOutlinePhoto, HiOutlineXCircle } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const postSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  category_id: z.string({
    invalid_type_error: "Please select a category.",
  }),
  excerpt: z.string().min(10, {
    message: "Excerpt must be at least 10 characters.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  thumbnail: z.any().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  initialData?: PostFormValues & { thumbnail_url?: string };
  id?: string;
}

export function PostForm({ initialData, id }: PostFormProps) {
  const router = useRouter();
  const isEditing = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.thumbnail_url || null);
  const [fetchedCategories, setFetchedCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/category");
        const result = await response.json();
        if (result.status === "success" && Array.isArray(result.data)) {
          setFetchedCategories(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      title: "",
      category_id: "",
      excerpt: "",
      content: "",
    },
  });

  async function onSubmit(values: PostFormValues) {
    try {
      const formData = new FormData();
      formData.append("user_id", "1"); // Hardcoded until auth is implemented
      formData.append("category_id", values.category_id);
      formData.append("title", values.title);
      formData.append("excerpt", values.excerpt);
      formData.append("content", values.content);
      
      if (values.thumbnail instanceof File) {
        formData.append("thumbnail", values.thumbnail);
      }

      const url = isEditing 
        ? `http://localhost:8080/v1/posts/${id}` 
        : "http://localhost:8080/v1/posts";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(isEditing ? "Post updated successfully!" : "Post created successfully!");
        router.push("/dashboard/posts");
      } else {
        alert(result.errors || "Failed to save post");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue("thumbnail", file);
    }
  }

  function removeThumbnail() {
    setPreviewUrl(null);
    form.setValue("thumbnail", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief summary of the post..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your article content here..." 
                      className="min-h-[300px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Sidebar / Meta Area */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fetchedCategories.map((cat: any) => (
                        <SelectItem 
                          key={cat.id_category} 
                          value={cat.id_category.toString()}
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div 
                    className="relative aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 flex items-center justify-center overflow-hidden transition-colors hover:bg-muted cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {previewUrl ? (
                      <>
                        <Image 
                          src={previewUrl} 
                          alt="Thumbnail preview" 
                          fill 
                          className="object-cover" 
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeThumbnail();
                          }}
                        >
                          <HiOutlineXCircle className="size-5 text-destructive" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <HiOutlinePhoto className="size-10 opacity-50" />
                        <span className="text-sm font-medium">Click to upload image</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p className="text-[0.8rem] text-muted-foreground text-center">
                    JPG, PNG or WEBP. Max 2MB.
                  </p>
                </div>
              </FormControl>
            </FormItem>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t">
          <Button type="submit" size="lg" className="min-w-[150px]">
            {isEditing ? "Update Post" : "Publish Post"}
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard/posts">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
