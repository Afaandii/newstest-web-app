"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderTree,
  Settings,
  Newspaper,
  ChevronRight,
  BarChart3,
  HelpCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

const navGroups = [
  {
    title: "Utama",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Ringkasan",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Konten",
    items: [
      {
        title: "Semua Post",
        href: "/dashboard/posts",
        icon: FileText,
      },
      {
        title: "Kategori",
        href: "/dashboard/categories",
        icon: FolderTree,
      },
    ],
  },
  {
    title: "Manajemen",
    items: [
      {
        title: "Pengguna",
        href: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Pengaturan",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "Lainnya",
    items: [
      {
        title: "Bantuan",
        href: "/dashboard/help",
        icon: HelpCircle,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
                  <Newspaper className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg tracking-tight">NewsTest</span>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-widest">
                    v1.0.0
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-4">
        {navGroups.map((group) => (
          <SidebarGroup key={group.title} className="mb-4">
            <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                      className="px-4 py-2"
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="size-4 opacity-70" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:hidden">
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-sm font-semibold text-muted-foreground">© 2026 Admin</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
