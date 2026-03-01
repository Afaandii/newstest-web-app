"use client";

import { useEffect, useState } from "react";
import { Body, Layout } from "@/components/layout";
import { UserForm } from "../../user-form";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UpdateUserPage({ params }: { params: Promise<{ id: string }> }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setUserId(p.id));
  }, [params]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/v1/users/${userId}`);
        const result = await response.json();
        
        if (response.ok) {
          setUser(result.datas);
        } else {
          setError(result.errors || "Failed to fetch user");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading || !userId) {
    return (
      <Layout>
        <Body>
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">Loading user data...</p>
          </div>
        </Body>
      </Layout>
    );
  }

  if (error || !user) {
    return (
      <Layout>
        <Body>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">User not found</h2>
            <p className="text-muted-foreground mt-2">{error || "The user profile you are looking for does not exist."}</p>
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
              Update profile and account information for {user.name}.
            </p>
          </div>
        </div>

        <div className="p-8 border rounded-xl bg-card shadow-sm">
          <UserForm 
            id={String(user.id)} 
            initialData={{
              nama: user.name,
              email: user.email,
              nip: user.nip,
              address: user.address,
              role_id: String(user.role_id),
              avatar_url: user.avatar,
            }} 
          />
        </div>
      </Body>
    </Layout>
  );
}
