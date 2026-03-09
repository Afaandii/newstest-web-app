"use client";

import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { LogOut, User, Settings, Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Header } from "@/components/layout";
import { CommandMenu } from "./command-menu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });
}

export function AdminHeader() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const [user, setUser] = React.useState<{ name: string; email: string; avatar?: string } | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const response = await fetch("http://localhost:8080/v1/auth/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUser({
            name: result.data.name,
            email: result.data.email,
            avatar: result.data.avatar,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      
      // Call backend logout if token exists
      if (token) {
        await fetch("http://localhost:8080/v1/auth/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      // Clear local state regardless of backend success
      Cookies.remove("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role_id");

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear local state and redirect as a fallback
      Cookies.remove("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role_id");
      router.push("/login");
    }
  };

  return (
    <Header fixed className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
      <div className="flex items-center gap-2 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 !h-4" />
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        {/* Search Mock */}
        <div 
          onClick={() => setOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/40 bg-muted/10 text-muted-foreground/70 transition-colors hover:bg-muted/20 cursor-pointer min-w-[280px]"
        >
          <Search className="size-4" />
          <span className="text-sm">Search</span>
          <div className="ml-auto flex items-center gap-1 rounded border border-border/40 bg-muted/20 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </div>
        </div>

        <CommandMenu open={open} setOpen={setOpen} />

        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>

        {/* User Menu */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 px-2 gap-2 hover:bg-transparent cursor-pointer">
              <Avatar className="h-9 w-9 shadow-sm">
                {user?.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {user?.name ? user.name.substring(0, 2).toUpperCase() : ""}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "Loading..."}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Header>
  );
}
