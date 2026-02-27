"use client";

import { useEffect, useState, use } from "react";
import { Body } from "@/components/layout";
import { Layout } from "@/components/layout";
import { CategoryForm } from "../../category-form";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/v1/category/${id}`);
        const result = await response.json();
        
        if (result.status === "succees") { // Note: Backend has typo "succees"
          setCategory(result.data);
        } else {
          setError(result.error || "Category not found");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Body>
          <div className="text-center py-20 text-muted-foreground">Loading category...</div>
        </Body>
      </Layout>
    );
  }

  if (error || !category) {
    return (
      <Layout>
        <Body>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">{error || "Category not found"}</h2>
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
            id={String(category.id_category)} 
            initialData={{
              name: category.name,
              slug: category.name.toLowerCase().replace(/ /g, "-"),
              description: category.description || "",
            }} 
          />
        </div>
      </Body>
    </Layout>
  );
}
