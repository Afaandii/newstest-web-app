"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineRectangleStack,
  HiOutlineCog6Tooth,
  HiOutlineNewspaper,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

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
import { FileText } from "lucide-react";
import { FaUserTie } from "react-icons/fa6";

const navGroups = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: HiOutlineSquares2X2,
      },
      {
        title: "Analytics",
        href: "/dashboard",
        icon: HiOutlineChartBar,
      },
    ],
  },
  {
    title: "Master",
    items: [
      {
        title: "Categories",
        href: "/dashboard/categories",
        icon: HiOutlineRectangleStack,
      },
      {
        title: "Posts",
        href: "/dashboard/posts",
        icon: FileText,
      },
      {
        title: "Comments",
        href: "/dashboard/comments",
        icon: HiOutlineChatBubbleLeftRight,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        href: "/dashboard/users",
        icon: HiOutlineUsers,
      },
      {
        title: "Roles",
        href: "/dashboard/roles",
        icon: FaUserTie,
      },
      {
        title: "Settings",
        href: "/dashboard",
        icon: HiOutlineCog6Tooth,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="h-16 flex items-center px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-3xl tracking-tight">NewsTest.</span>
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

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:hidden">
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-sm font-semibold text-muted-foreground">Newstest Admin ©2026</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
