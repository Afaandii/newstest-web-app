"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  HiOutlinePlus, 
  HiOutlinePencilSquare, 
  HiOutlineTrash,
  HiOutlineMagnifyingGlass
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
import { Layout, Body, Header } from "@/components/layout";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/v1/category");
      const result = await response.json();
      
      if (result.status === "success") {
        setCategories(result.data || []);
      } else {
        setError(result.error || "Failed to fetch categories");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`http://localhost:8080/v1/category/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        
        if (response.ok) {
          setCategories(categories.filter((cat) => cat.id_category !== id));
        } else {
          alert(result.errors || "Failed to delete category");
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
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground mt-1">
              Manage your article categories here.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/categories/create">
              <HiOutlinePlus className="mr-2 size-4" /> Add Category
            </Link>
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <CardTitle>All Categories</CardTitle>
                <CardDescription>
                  List of available categories and their post counts.
                </CardDescription>
              </div>
              <div className="relative w-64">
                <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-right">Posts</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Loading categories...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-destructive">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id_category} className="group">
                      <TableCell className="font-semibold">
                        {category.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {category.name.toLowerCase().replace(/ /g, "-")}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground max-w-[300px] truncate">
                        {category.description}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {category.Post?.length || 0}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild className="size-8">
                            <Link href={`/dashboard/categories/update/${category.id_category}`}>
                              <HiOutlinePencilSquare className="size-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(category.id_category)}
                          >
                            <HiOutlineTrash className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No categories found.
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
