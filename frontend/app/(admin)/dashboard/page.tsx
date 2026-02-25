import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  FileText,
  TrendingUp,
  Eye,
  Plus,
} from "lucide-react";
import { Layout, Body } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statsCards = [
  {
    title: "Total Pengguna",
    value: "1,234",
    change: "+12%",
    icon: Users,
    description: "dari bulan lalu",
    trend: "up",
  },
  {
    title: "Total Post",
    value: "456",
    change: "+8%",
    icon: FileText,
    description: "dari bulan lalu",
    trend: "up",
  },
  {
    title: "Total View",
    value: "89,012",
    change: "+23%",
    icon: Eye,
    description: "dari bulan lalu",
    trend: "up",
  },
  {
    title: "Engagement",
    value: "34.5%",
    change: "+5.2%",
    icon: TrendingUp,
    description: "dari bulan lalu",
    trend: "up",
  },
];

const recentPosts = [
  {
    id: 1,
    title: "Breaking: Teknologi AI Terbaru 2026",
    author: "Admin Afandi",
    status: "Published",
    date: "25 Feb 2026",
    views: "1,234",
  },
  {
    id: 2,
    title: "Update Kebijakan Privasi Data",
    author: "Editor",
    status: "Draft",
    date: "24 Feb 2026",
    views: "0",
  },
  {
    id: 3,
    title: "Tips Produktivitas untuk Developer",
    author: "Admin Afandi",
    status: "Published",
    date: "23 Feb 2026",
    views: "856",
  },
  {
    id: 4,
    title: "Review Smartphone Terbaik 2026",
    author: "Contributor",
    status: "Review",
    date: "22 Feb 2026",
    views: "0",
  },
  {
    id: 5,
    title: "Panduan Belajar Next.js untuk Pemula",
    author: "Admin Afandi",
    status: "Published",
    date: "21 Feb 2026",
    views: "2,341",
  },
];

function getStatusVariant(status: string) {
  switch (status) {
    case "Published":
      return "default" as const;
    case "Draft":
      return "secondary" as const;
    case "Review":
      return "outline" as const;
    default:
      return "secondary" as const;
  }
}

export default function DashboardPage() {
  return (
    <Layout>
      <Body className="space-y-8">
        {/* Page Title Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">
              Selamat datang kembali, berikut statistik performa NewsTest hari ini.
            </p>
          </div>
          <Button className="shadow-md">
            <Plus className="mr-2 size-4" /> Buat Post Baru
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat) => (
            <Card key={stat.title} className="shadow-sm border-muted-foreground/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-primary/5 rounded-md">
                  <stat.icon className="h-4 w-4 text-primary opacity-80" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                <div className="flex items-center gap-1 mt-2 text-xs">
                  <span className="text-emerald-600 font-bold flex items-center">
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid gap-4 lg:grid-cols-7">
          {/* Main Table */}
          <Card className="lg:col-span-4 shadow-sm border-muted-foreground/10">
            <CardHeader className="pb-3">
              <CardTitle>Aktivitas Post Terbaru</CardTitle>
              <CardDescription>
                Daftar semua artikel yang baru saja diproses oleh tim editorial.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[300px]">Judul Artikel</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPosts.map((post) => (
                    <TableRow key={post.id} className="cursor-pointer group">
                      <TableCell className="font-semibold truncate max-w-[300px] group-hover:text-primary transition-colors">
                        {post.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{post.author}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(post.status)} className="px-2 py-0 border-none">
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm leading-none">
                        {post.views}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Stats / Charts Placeholder Card */}
          <Card className="lg:col-span-3 shadow-sm border-muted-foreground/10">
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
              <CardDescription>
                Kategori berita paling populer minggu ini.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Teknologi", count: "45%", color: "bg-blue-500" },
                  { name: "Ekonomi", count: "30%", color: "bg-emerald-500" },
                  { name: "Politik", count: "15%", color: "bg-amber-500" },
                  { name: "Gaya Hidup", count: "10%", color: "bg-rose-500" },
                ].map((cat) => (
                  <div key={cat.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-muted-foreground">{cat.count}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", cat.color)}
                        style={{ width: cat.count }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Body>
    </Layout>
  );
}
