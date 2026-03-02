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
import { Layout, Body } from "@/components/layout";
import { format } from "date-fns";

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/v1/roles");
      const result = await response.json();
      
      if (result.status === "success") {
        setRoles(result.data || []);
      } else {
        setError(result.error || "Failed to fetch roles");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const filteredRoles = roles.filter((role) =>
    role.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.handle_access?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this role?")) {
      try {
        const response = await fetch(`http://localhost:8080/v1/roles/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        
        if (response.ok) {
          setRoles(roles.filter((role) => role.id_role !== id));
        } else {
          alert(result.errors || "Failed to delete role");
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
            <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
            <p className="text-muted-foreground mt-1">
              Manage user roles and permissions here.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/roles/create">
              <HiOutlinePlus className="mr-2 size-4" /> Add Role
            </Link>
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <CardTitle>All Roles</CardTitle>
                <CardDescription>
                  List of available roles in the system.
                </CardDescription>
              </div>
              <div className="relative w-64">
                <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search roles..."
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
                  <TableHead>Handle Access</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      Loading roles...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-destructive">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <TableRow key={role.id_role} className="group">
                      <TableCell className="font-semibold">
                        {role.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {role.handle_access}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {role.created_at ? format(new Date(role.created_at), "dd MMM yyyy") : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild className="size-8">
                            <Link href={`/dashboard/roles/update/${role.id_role}`}>
                              <HiOutlinePencilSquare className="size-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(role.id_role)}
                          >
                            <HiOutlineTrash className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      No roles found.
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
