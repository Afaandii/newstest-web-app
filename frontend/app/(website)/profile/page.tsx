"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Camera, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
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
        alert("Gagal memperbarui profil. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Terjadi kesalahan teknis.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus akun ini secara permanen? Tindakan ini tidak dapat dibatalkan.");
    
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
        alert("Terjadi kesalahan teknis.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f4f4f4] pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors font-semibold cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="relative group">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-sm cursor-pointer">
              {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback className="bg-white text-[#1a1a1a] text-3xl font-black">
                {user.name ? user.name.substring(0, 2).toUpperCase() : "UT"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-1 bg-red-600 p-2 rounded-full border-2 border-white text-white cursor-pointer hover:bg-red-700 transition-colors">
              <Camera size={18} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">Your account</h1>
        </div>

        {/* Basic Info Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-10">
          <div className="px-8 py-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#1a1a1a]">Basic Info</h2>
          </div>
          
          {/* Display Name Row */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50 flex-wrap gap-4">
            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Display name</span>
              {isEditingName ? (
                <input 
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-lg font-medium text-[#1a1a1a] border-b-2 border-blue-500 outline-none w-full max-w-md py-1"
                  autoFocus
                />
              ) : (
                <span className="text-lg font-medium text-[#1a1a1a]">{user.name}</span>
              )}
            </div>
            {isEditingName ? (
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setIsEditingName(false);
                    setEditName(user.name);
                  }}
                  variant="ghost" 
                  className="font-bold px-4 cursor-pointer"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleSave("name")}
                  className="bg-black text-white font-bold px-6 hover:bg-[#333] transition-all rounded-md cursor-pointer"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setIsEditingName(true)}
                variant="outline" 
                className="border-black font-bold px-6 hover:bg-black hover:text-white transition-all rounded-md cursor-pointer"
              >
                Edit
              </Button>
            )}
          </div>

          {/* Email Row */}
          <div className="flex items-center justify-between px-8 py-6 flex-wrap gap-4">
            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email address</span>
              {isEditingEmail ? (
                <input 
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="text-lg font-medium text-[#1a1a1a] border-b-2 border-blue-500 outline-none w-full max-w-md py-1"
                  autoFocus
                />
              ) : (
                <span className="text-lg font-medium text-[#1a1a1a]">{user.email}</span>
              )}
            </div>
            {isEditingEmail ? (
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setIsEditingEmail(false);
                    setEditEmail(user.email);
                  }}
                  variant="ghost" 
                  className="font-bold px-4 cursor-pointer"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleSave("email")}
                  className="bg-black text-white font-bold px-6 hover:bg-[#333] transition-all rounded-md cursor-pointer"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setIsEditingEmail(true)}
                variant="outline" 
                className="border-black font-bold px-6 hover:bg-black hover:text-white transition-all rounded-md cursor-pointer"
              >
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Account Management Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#1a1a1a]">Account management</h2>
          </div>

          <div className="px-8 py-6">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Delete your account</h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-gray-600 font-medium">
                Deleting your account permanently removes your data and profile.
              </p>
              <Button 
                onClick={handleDeleteAccount}
                variant="outline" 
                className="text-red-600 border-red-600 font-bold px-6 hover:bg-red-600 hover:text-white transition-all rounded-md cursor-pointer"
              >
                Delete account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
