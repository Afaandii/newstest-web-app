"use client";

import { use } from "react";
import { Body } from "@/components/layout";
import { Layout } from "@/components/layout";
import { CategoryForm } from "../../category-form";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dummy data for finding category
const initialCategories = [
  { id: "1", name: "Technology", slug: "technology", description: "Latest gadgets and software updates." },
  { id: "2", name: "Economy", slug: "economy", description: "Market trends and financial news." },
  { id: "3", name: "Politics", slug: "politics", description: "Government and international relations." },
  { id: "4", name: "Lifestyle", slug: "lifestyle", description: "Health, travel, and fashion." },
  { id: "5", name: "Sports", slug: "sports", description: "Tournament results and athlete profiles." },
];

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const category = initialCategories.find((cat) => cat.id === id);

  if (!category) {
    return (
      <Layout>
        <Body>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Category not found</h2>
            <p className="text-muted-foreground mt-2">The category you are looking for does not exist.</p>
            <Button asChild className="mt-6">
              <Link href="/dashboard/categories">Back to Categories</Link>
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
            <Link href="/dashboard/categories" className="flex items-center gap-1">
              <HiOutlineChevronLeft className="size-4" /> Back to Categories
            </Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
            <p className="text-muted-foreground mt-1">
              Update the details for the "{category.name}" category.
            </p>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <CategoryForm 
            id={category.id} 
            initialData={{
              name: category.name,
              slug: category.slug,
              description: category.description || "",
            }} 
          />
        </div>
      </Body>
    </Layout>
  );
}
