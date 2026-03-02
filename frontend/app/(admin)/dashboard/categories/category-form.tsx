"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData?: CategoryFormValues;
  id?: string;
}

export function CategoryForm({ initialData, id }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = !!id;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: CategoryFormValues) {
    try {
      const url = isEditing 
        ? `http://localhost:8080/v1/category/${id}` 
        : "http://localhost:8080/v1/category";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(isEditing ? "Category updated successfully!" : "Category created successfully!");
        router.push("/dashboard/categories");
      } else {
        alert(result.errors || "Failed to save category");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Technology" {...field} />
                </FormControl>
                <FormDescription>
                  This is the public display name for the category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Briefly describe what this category covers..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Optional description of the category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" className="cursor-pointer">
            {isEditing ? "Submit" : "Submit"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/categories">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
