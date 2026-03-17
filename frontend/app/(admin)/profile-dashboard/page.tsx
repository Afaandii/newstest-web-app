"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Camera, User, ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id_user: number; name: string; email: string; avatar?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch("http://localhost:8080/v1/auth/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          const userData = {
            id_user: result.data.id_user,
            name: result.data.name,
            email: result.data.email,
            avatar: result.data.avatar,
          };
          setUser(userData);
          setEditName(result.data.name);
          setEditEmail(result.data.email);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSave = async (field: "name" | "email") => {
    if (!user) return;
    setIsSaving(true);
    try {
      const token = Cookies.get("token");
      const updatedData = {
        name: field === "name" ? editName : user.name,
        email: field === "email" ? editEmail : user.email,
      };

      const response = await fetch(`http://localhost:8080/v1/users/${user.id_user}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setUser({ ...user, ...updatedData });
        if (field === "name") setIsEditingName(false);
        if (field === "email") setIsEditingEmail(false);
      } else {
        alert("Gagal memperbarui profil.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus akun ini secara permanen dari dashboard? Semua data Anda akan hilang.");
    
    if (confirmed) {
      try {
        const token = Cookies.get("token");
        const response = await fetch(`http://localhost:8080/v1/users/${user.id_user}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          Cookies.remove("token");
          localStorage.clear();
          router.push("/");
          window.location.reload();
        } else {
          alert("Gagal menghapus akun.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your account information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-muted/50">
            <CardContent className="pt-10 pb-10 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-4xl font-bold">
                    {user.name ? user.name.substring(0, 2).toUpperCase() : "UT"}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-1 right-1 bg-primary text-primary-foreground p-2 rounded-full border-4 border-background hover:scale-110 transition-transform shadow-lg cursor-pointer">
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                 <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">Administrator</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Detailed Info & Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information Card */}
          <Card className="border-none shadow-sm ring-1 ring-muted">
            <CardHeader className="border-b bg-muted/30 py-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <User size={20} className="text-primary" />
                Basic Information
              </CardTitle>
              <CardDescription>Update your public profile details.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Name Field */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Display Name</Label>
                  {!isEditingName && (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditingName(true)} className="text-primary hover:text-primary/80 font-bold cursor-pointer">
                      Edit
                    </Button>
                  )}
                </div>
                {isEditingName ? (
                  <div className="flex gap-2">
                    <Input 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1"
                      autoFocus
                    />
                    <Button variant="outline" onClick={() => setIsEditingName(false)} disabled={isSaving} className="cursor-pointer">Cancel</Button>
                    <Button onClick={() => handleSave("name")} disabled={isSaving} className="cursor-pointer">
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                ) : (
                  <p className="text-lg font-medium">{user.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Email Address</Label>
                  {!isEditingEmail && (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditingEmail(true)} className="text-primary hover:text-primary/80 font-bold cursor-pointer">
                      Edit
                    </Button>
                  )}
                </div>
                {isEditingEmail ? (
                  <div className="flex gap-2">
                    <Input 
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="flex-1"
                      autoFocus
                    />
                    <Button variant="outline" onClick={() => setIsEditingEmail(false)} disabled={isSaving} className="cursor-pointer">Cancel</Button>
                    <Button onClick={() => handleSave("email")} disabled={isSaving} className="cursor-pointer">
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                ) : (
                  <p className="text-lg font-medium">{user.email}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone Card */}
          <Card className="border-destructive/20 shadow-sm bg-destructive/[0.02]">
            <CardHeader className="border-b border-destructive/10 py-4">
              <CardTitle className="text-xl text-destructive flex items-center gap-2">
                <ShieldAlert size={20} />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground">Delete Account</h4>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  className="font-bold whitespace-nowrap cursor-pointer"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
