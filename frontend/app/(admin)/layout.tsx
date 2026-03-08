"use client";

import * as React from "react";
import { useEffect } from "react";
import { SidebarProvider, SidebarRail } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { ThemeProvider } from "@/components/theme-provider";
import RoleCheck from "@/components/admin/role-check";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add("admin-mode");
    return () => document.documentElement.classList.remove("admin-mode");
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RoleCheck>
        <SidebarProvider>
          <SidebarRail />
          <AdminSidebar />
          <div className="flex flex-1 flex-col overflow-y-auto bg-background relative admin-scroll-container admin-body admin-main scroll-smooth">
            <AdminHeader />
            <main className="flex-1 pt-16 admin-main">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </RoleCheck>
    </ThemeProvider>
  );
}
