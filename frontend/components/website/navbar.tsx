"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Beranda", slug: "/" },
  { name: "Nasional", slug: "nasional" },
  { name: "Ekonomi", slug: "ekonomi" },
  { name: "Teknologi", slug: "teknologi" },
  { name: "Olahraga", slug: "olahraga" },
  { name: "Hiburan", slug: "hiburan" },
  { name: "Sains", slug: "sains" },
  { name: "Gaya Hidup", slug: "gaya-hidup" },
];

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              {/* Search */}
              <div className="relative">
                {searchOpen && (
                  <input
                    type="text"
                    placeholder="Cari berita..."
                    autoFocus
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
              {/* Login */}
              <a
                href="/login"
                className="hidden md:inline-flex px-5 py-1.5 text-sm font-semibold text-white bg-[#1a1a1a] hover:bg-[#333] transition-colors"
              >
                Masuk
              </a>
              {/* Mobile toggle */}
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
          <div className="text-center">
            <a href="/">
              <h1
                className="text-5xl md:text-7xl font-black tracking-tight text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                NewsTest
              </h1>
            </a>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mt-1 font-sans">
              Portal Berita Terpercaya
            </p>
          </div>
        </div>

        {/* Double rule */}
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
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0 overflow-x-auto">
            {categories.map((cat) => {
              const isActive = 
                (cat.slug === "/" && pathname === "/") || 
                (cat.slug !== "/" && pathname === `/kategori/${cat.slug}`);
                
              return (
                <a
                  key={cat.name}
                  href={cat.slug === "/" ? "/" : `/kategori/${cat.slug}`}
                  className={`relative px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-all duration-200 border-b-2 ${
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

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="md:hidden py-3 flex flex-wrap gap-1">
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
              <a
                href="/login"
                className="w-full mt-2 text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#1a1a1a]"
              >
                Masuk
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
