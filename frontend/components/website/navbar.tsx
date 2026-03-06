"use client";

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const categories = [
  "Beranda",
  "Nasional",
  "Ekonomi",
  "Teknologi",
  "Olahraga",
  "Hiburan",
  "Sains",
  "Gaya Hidup",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="relative z-50">
      {/* Top bar — Logo + Search */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(77, 208, 225, 0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div>
              <h1
                className="text-2xl md:text-3xl font-black tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #e0f7fa, #4dd0e1, #00897b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                NewsTest.
              </h1>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 -mt-0.5">
                Portal Berita
              </p>
            </div>
          </a>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Cari berita..."
                  autoFocus
                  className="absolute right-10 top-1/2 -translate-y-1/2 w-48 md:w-64 px-4 py-2 text-sm text-white/90 placeholder:text-white/30 outline-none"
                  style={{
                    background: "rgba(77, 208, 225, 0.1)",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(77, 208, 225, 0.2)",
                    backdropFilter: "blur(12px)",
                  }}
                />
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl text-white/50 hover:text-[#4dd0e1] hover:bg-white/5 transition-all duration-300"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Login */}
            <a
              href="/login"
              className="hidden md:inline-flex px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #4dd0e1, #00897b)",
                boxShadow: "0 4px 15px rgba(77, 208, 225, 0.25)",
              }}
            >
              Masuk
            </a>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <nav
        style={{
          background: "rgba(77, 208, 225, 0.06)",
          borderBottom: "1px solid rgba(77, 208, 225, 0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0 overflow-x-auto py-0">
            {categories.map((cat, i) => (
              <a
                key={cat}
                href={i === 0 ? "/" : "#"}
                className="relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300"
                style={{
                  color:
                    i === 0 ? "#4dd0e1" : "rgba(255,255,255,0.5)",
                  borderBottom:
                    i === 0
                      ? "2px solid #4dd0e1"
                      : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (i !== 0) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                    e.currentTarget.style.borderBottomColor =
                      "rgba(77, 208, 225, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (i !== 0) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.borderBottomColor = "transparent";
                  }
                }}
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="md:hidden py-3 flex flex-wrap gap-1">
              {categories.map((cat, i) => (
                <a
                  key={cat}
                  href={i === 0 ? "/" : "#"}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{
                    color:
                      i === 0 ? "#4dd0e1" : "rgba(255,255,255,0.5)",
                    background:
                      i === 0
                        ? "rgba(77, 208, 225, 0.1)"
                        : "transparent",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {cat}
                </a>
              ))}
              <a
                href="/login"
                className="w-full mt-2 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #4dd0e1, #00897b)",
                }}
              >
                Masuk
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
