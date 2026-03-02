"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { HiOutlineShieldCheck } from "react-icons/hi2";

interface Permission {
  id_permissions: number;
  name: string;
}

interface RolePermission {
  permission_id: number;
}

interface RolePermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleId: number | null;
  roleName: string | null;
}

export function RolePermissionModal({
  isOpen,
  onClose,
  roleId,
  roleName,
}: RolePermissionModalProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [activePermissions, setActivePermissions] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [toggling, setToggling] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && roleId) {
      fetchData();
    }
  }, [isOpen, roleId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all available permissions
      const resAll = await fetch("http://localhost:8080/v1/permissions/");
      const dataAll = await resAll.json();

      // Fetch active permissions for this role
      const resActive = await fetch(`http://localhost:8080/v1/role-permissions/${roleId}`);
      const dataActive = await resActive.json();

      if (dataAll.status === "success") {
        setPermissions(dataAll.data || []);
      }
      if (dataActive.status === "success") {
        // Use column names from the backend (permission_id)
        const activeIds = (dataActive.data || []).map((rp: any) => rp.permission_id);
        setActivePermissions(activeIds);
      }
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (permissionId: number) => {
    if (!roleId) return;
    
    setToggling(permissionId);
    try {
      const response = await fetch("http://localhost:8080/v1/role-permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role_id: roleId,
          permission_id: permissionId,
        }),
      });

      if (response.ok) {
        setActivePermissions((prev) =>
          prev.includes(permissionId)
            ? prev.filter((id) => id !== permissionId)
            : [...prev, permissionId]
        );
      } else {
        alert("Failed to update permission");
      }
    } catch (error) {
      console.error("Toggle error:", error);
      alert("An error occurred while updating permissions");
    } finally {
      setToggling(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-[#020817] border-white/10 text-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <HiOutlineShieldCheck className="size-6 text-blue-500" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Role Permissions</DialogTitle>
              <DialogDescription className="text-slate-400">
                Configure access rights for <span className="text-blue-400 font-semibold">{roleName}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="size-10 animate-spin text-blue-500" />
              <p className="text-sm text-slate-400 animate-pulse">Fetching permissions...</p>
            </div>
          ) : (
            <div className="h-[400px] pr-4 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissions.map((permission) => {
                  const isChecked = activePermissions.includes(permission.id_permissions);
                  const isToggling = toggling === permission.id_permissions;
                  
                  return (
                    <div
                      key={permission.id_permissions}
                      className={`relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        isChecked 
                          ? "bg-blue-500/5 border-blue-500/30 ring-1 ring-blue-500/20" 
                          : "bg-white/5 border-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`perm-${permission.id_permissions}`}
                          checked={isChecked}
                          onCheckedChange={() => handleToggle(permission.id_permissions)}
                          disabled={isToggling}
                          className="size-5 border-slate-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                        <Label
                          htmlFor={`perm-${permission.id_permissions}`}
                          className={`text-sm font-medium cursor-pointer select-none transition-colors ${
                            isChecked ? "text-blue-200" : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {permission.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </Label>
                      </div>
                      
                      {isToggling && (
                        <div className="absolute right-4">
                          <Loader2 className="size-4 animate-spin text-blue-500" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {permissions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-slate-400 text-sm">No permissions found in the database.</p>
                  <p className="text-slate-500 text-xs mt-1">Make sure you have seeded your permissions table.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
