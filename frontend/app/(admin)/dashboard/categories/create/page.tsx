import { Body } from "@/components/layout";
import { Layout } from "@/components/layout";
import { CategoryForm } from "../category-form";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewCategoryPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Create New Category</h1>
            <p className="text-muted-foreground mt-1">
              Add a new category to organize your news content.
            </p>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <CategoryForm />
        </div>
      </Body>
    </Layout>
  );
}
