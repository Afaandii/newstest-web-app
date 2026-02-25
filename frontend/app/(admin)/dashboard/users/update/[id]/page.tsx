"use client";

import { use } from "react";
import { Body } from "@/components/layout";
import { Layout } from "@/components/layout";
import { UserForm } from "../../user-form";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dummy data for finding user
const initialUsers = [
  { 
    id: "1", 
    nama: "Admin Afandi", 
    email: "admin@newstest.com",
    role_id: "1",
    nip: "199001012015011001",
    address: "Jl. Merdeka No. 1, Jakarta",
    avatar_url: null
  },
  { 
    id: "2", 
    nama: "Jane Doe", 
    email: "jane@newstest.com",
    role_id: "3",
    nip: "199205122018022002",
    address: "Jl. Sudirman No. 10, Bandung",
    avatar_url: null
  }
];

export default function UpdateUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const user = initialUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <Layout>
        <Body>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">User not found</h2>
            <p className="text-muted-foreground mt-2">The user profile you are looking for does not exist.</p>
            <Button asChild className="mt-6">
              <Link href="/dashboard/users">Back to Users</Link>
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
            <Link href="/dashboard/users" className="flex items-center gap-1">
              <HiOutlineChevronLeft className="size-4" /> Back to Users
            </Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
            <p className="text-muted-foreground mt-1">
              Update profile and account information for {user.nama}.
            </p>
          </div>
        </div>

        <div className="p-8 border rounded-xl bg-card shadow-sm">
          <UserForm 
            id={user.id} 
            initialData={{
              nama: user.nama,
              email: user.email,
              nip: user.nip,
              address: user.address,
              role_id: user.role_id,
            }} 
          />
        </div>
      </Body>
    </Layout>
  );
}
