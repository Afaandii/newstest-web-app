import { Body } from "@/components/layout";
import { Layout } from "@/components/layout";
import { UserForm } from "../user-form";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateUserPage() {
  return (
    <Layout>
      <Body className="space-y-6">
        <div className="flex flex-col gap-4">
          <Button variant="ghost" size="sm" asChild className="w-fit -ml-2 text-muted-foreground">
            <Link href="/dashboard/users" className="flex items-center gap-1">
              <HiOutlineChevronLeft className="size-4" /> Back to Users
            </Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add User</h1>
            <p className="text-muted-foreground mt-1">
              Create a new user profile and assign a role.
            </p>
          </div>
        </div>

        <div className="p-8 border rounded-xl bg-card shadow-sm">
          <UserForm />
        </div>
      </Body>
    </Layout>
  );
}
