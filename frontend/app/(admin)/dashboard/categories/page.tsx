"use client";

import { useState } from "react";
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

// Dummy data
const initialCategories = [
  { id: "1", name: "Technology", slug: "technology", description: "Latest gadgets and software updates.", count: 45 },
  { id: "2", name: "Economy", slug: "economy", description: "Market trends and financial news.", count: 32 },
  { id: "3", name: "Politics", slug: "politics", description: "Government and international relations.", count: 18 },
  { id: "4", name: "Lifestyle", slug: "lifestyle", description: "Health, travel, and fashion.", count: 24 },
  { id: "5", name: "Sports", slug: "sports", description: "Tournament results and athlete profiles.", count: 15 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
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
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id} className="group">
                      <TableCell className="font-semibold">
                        {category.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {category.slug}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground max-w-[300px] truncate">
                        {category.description}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {category.count}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild className="size-8">
                            <Link href={`/dashboard/categories/update/${category.id}`}>
                              <HiOutlinePencilSquare className="size-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(category.id)}
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
