"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  HiOutlinePlus, 
  HiOutlinePencilSquare, 
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
  HiOutlineUser
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
import { Badge } from "@/components/ui/badge";
import { Layout, Body } from "@/components/layout";

// Dummy data
const initialUsers = [
  { 
    id: "1", 
    nama: "Admin Afandi", 
    email: "admin@newstest.com",
    role: "Super Admin",
    nip: "199001012015011001",
    avatar: null
  },
  { 
    id: "2", 
    nama: "Jane Doe", 
    email: "jane@newstest.com",
    role: "Editor",
    nip: "199205122018022002",
    avatar: null
  },
  { 
    id: "3", 
    nama: "Bob Smith", 
    email: "bob@newstest.com",
    role: "Writer",
    nip: "199510202020031003",
    avatar: null
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <Layout>
      <Body className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage system users, roles, and permissions.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/users/create">
              <HiOutlinePlus className="mr-2 size-4" /> Add User
            </Link>
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  A complete list of users registered in the system.
                </CardDescription>
              </div>
              <div className="relative w-64">
                <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
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
                  <TableHead className="w-[60px]">Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">NIP</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="group">
                      <TableCell>
                        <div className="size-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                          {user.avatar ? (
                             <Image 
                               src={user.avatar} 
                               alt={user.nama} 
                               width={40} 
                               height={40} 
                               className="object-cover size-full"
                             />
                          ) : (
                            <HiOutlineUser className="size-5 text-muted-foreground/50" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold">{user.nama}</span>
                          <span className="text-xs text-muted-foreground md:hidden">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {user.email}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell font-mono text-xs text-muted-foreground">
                        {user.nip}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-medium">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild className="size-8">
                            <Link href={`/dashboard/users/update/${user.id}`}>
                              <HiOutlinePencilSquare className="size-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(user.id)}
                          >
                            <HiOutlineTrash className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No users found.
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
