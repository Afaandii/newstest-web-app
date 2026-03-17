"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCategories, type Category } from "@/lib/news";
import Cookies from "js-cookie";
import { 
  LogOut, 
  User as UserIcon, 
  Settings, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";
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

function getFormattedDate() {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const d = new Date();
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  
  // Scroll arrow logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchCats = async () => {
      const data = await getCategories();
      const mapped = data.map(c => ({ name: c.name, slug: c.slug }));
      setCategories([{ name: "Beranda", slug: "/" }, ...mapped]);
      // Small timeout to ensure DOM is updated before checking scroll
      setTimeout(checkScroll, 100);
    };
    fetchCats();

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

    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("resize", checkScroll);
    
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await fetch("http://localhost:8080/v1/auth/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
      Cookies.remove("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role_id");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      Cookies.remove("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role_id");
      setUser(null);
      router.push("/");
    }
  };

  return (
    <>
      {/* Top bar — Masthead — SCROLLS AWAY */}
      <div className="relative z-[60] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-5">
          {/* Date row */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] tracking-[0.15em] uppercase text-gray-500 font-sans">
              {getFormattedDate()}
            </p>
            <div className="flex items-center gap-2">
              <div className="relative">
                {searchOpen && (
                  <input
                    type="text"
                    placeholder="Cari berita..."
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const val = e.currentTarget.value;
                        if (val.trim()) {
                          router.push(`/search?q=${encodeURIComponent(val)}`);
                          setSearchOpen(false);
                        }
                      }
                    }}
                    className="absolute right-10 top-1/2 -translate-y-1/2 w-48 md:w-64 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-gray-100 border border-gray-300 rounded"
                  />
                )}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              </div>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 outline-none cursor-pointer">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                        <AvatarFallback className="bg-[#1a1a1a] text-white text-[10px] font-bold">
                          {user.name ? user.name.substring(0, 2).toUpperCase() : "UT"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 z-[100]" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/profile")}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  href="/login"
                  className="hidden md:inline-flex px-5 py-1.5 text-sm font-semibold text-white bg-[#1a1a1a] hover:bg-[#333] transition-colors"
                >
                  Masuk
                </a>
              )}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Masthead */}
          <div className="text-center mb-3">
            <a href="/" className="text-5xl md:text-7xl font-black tracking-tight text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                NewsTest
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="newspaper-double-rule" />
        </div>
      </div>

      {/* Category tabs — STICKY */}
      <nav
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-gray-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 relative group">
          {/* Desktop Categories — SCROLLABLE */}
          <div className="hidden md:block relative overflow-hidden">
            {/* Left Arrow */}
            {showLeftArrow && (
              <button 
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white/90 border border-gray-200 shadow-sm text-[#1a1a1a] hover:text-[#c41e2f] transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
            )}

            <div 
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex items-center gap-0 overflow-x-auto no-scrollbar scroll-smooth"
              id="category-scroll-container"
            >
              {categories.map((cat) => {
                const isActive = 
                  (cat.slug === "/" && pathname === "/") || 
                  (cat.slug !== "/" && pathname === `/kategori/${cat.slug}`);
                  
                return (
                  <a
                    key={cat.name}
                    href={cat.slug === "/" ? "/" : `/kategori/${cat.slug}`}
                    className={`relative px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                      isActive
                        ? "text-[#c41e2f] border-[#c41e2f]"
                        : "text-gray-600 border-transparent hover:text-[#1a1a1a] hover:border-gray-400"
                    }`}
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {cat.name}
                  </a>
                );
              })}
            </div>
            
            {/* Right Arrow */}
            {showRightArrow && (
              <button 
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white/90 border border-gray-200 shadow-sm text-[#1a1a1a] hover:text-[#c41e2f] transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            )}

            {/* Optional Shadow Indicators (Fade) - integrated with arrows or purely visual */}
            <div className={`absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white pointer-events-none transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white pointer-events-none transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="md:hidden py-3 flex flex-wrap gap-1 max-h-[60vh] overflow-y-auto no-scrollbar">
              {categories.map((cat) => {
                const isActive = 
                  (cat.slug === "/" && pathname === "/") || 
                  (cat.slug !== "/" && pathname === `/kategori/${cat.slug}`);

                return (
                  <a
                    key={cat.name}
                    href={cat.slug === "/" ? "/" : `/kategori/${cat.slug}`}
                    className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-[#c41e2f] bg-red-50"
                        : "text-gray-600 hover:text-[#1a1a1a]"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.name}
                  </a>
                );
              })}
              {user ? (
                <div className="w-full mt-2 border-t pt-3">
                  <div className="flex items-center gap-3 px-4 py-2 mb-2">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                      <AvatarFallback className="bg-[#1a1a1a] text-white text-xs font-bold">
                        {user.name ? user.name.substring(0, 2).toUpperCase() : "UT"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-[#1a1a1a]">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <a
                      href="/profile"
                      className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-gray-600 hover:text-[#1a1a1a]"
                      onClick={() => setMobileOpen(false)}
                    >
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-gray-600 hover:text-[#1a1a1a]"
                      onClick={() => setMobileOpen(false)}
                    >
                      Settings
                    </a>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Keluar
                    </button>
                  </div>
                </div>
              ) : (
                <a
                  href="/login"
                  className="w-full mt-2 text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#1a1a1a]"
                >
                  Masuk
                </a>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hide scrollbar styles */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
