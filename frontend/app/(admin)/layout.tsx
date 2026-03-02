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
          <div className="flex flex-1 flex-col overflow-y-auto bg-background relative scrollbar-custom scroll-smooth">
            <AdminHeader />
            <main className="flex-1 pt-16">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </RoleCheck>
    </ThemeProvider>
  );
}
