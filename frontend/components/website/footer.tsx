"use client";

import { Github, Twitter, Instagram, Mail, ArrowUp } from "lucide-react";

const footerLinks = {
  Navigasi: [
    { label: "Beranda", href: "/" },
    { label: "Berita Terbaru", href: "#" },
    { label: "Kategori", href: "#" },
    { label: "Tentang Kami", href: "#" },
    { label: "Redaksi", href: "#" },
  ],
  Topik: [
    { label: "Teknologi", href: "#" },
    { label: "Ekonomi", href: "#" },
    { label: "Sains", href: "#" },
    { label: "Olahraga", href: "#" },
    { label: "Hiburan", href: "#" },
  ],
  Legal: [
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Pedoman Media", href: "#" },
    { label: "Kontak Redaksi", href: "#" },
    { label: "FAQ", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "Github" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16">
      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(77, 208, 225, 0.2), transparent)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="px-8 py-10"
          style={{
            background: "rgba(77, 208, 225, 0.04)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "1.5rem",
            border: "1px solid rgba(77, 208, 225, 0.08)",
            boxShadow:
              "0 -4px 30px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(77, 208, 225, 0.05)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="text-lg font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #e0f7fa, #4dd0e1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  NewsTest.
                </span>
              </div>
              <p className="text-white/35 text-sm leading-relaxed mb-5 max-w-xs">
                Portal berita terpercaya dengan informasi terkini dan terdalam dari berbagai sudut pandang.
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg text-white/30 hover:text-[#4dd0e1] transition-all duration-300 hover:bg-white/5"
                    style={{
                      border: "1px solid rgba(77, 208, 225, 0.08)",
                    }}
                  >
                    <social.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4
                  className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                  style={{ color: "rgba(77, 208, 225, 0.6)" }}
                >
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/35 hover:text-[#4dd0e1] transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div
            className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(77, 208, 225, 0.06)" }}
          >
            <p className="text-[11px] text-white/25">
              © 2026 NewsTest. Seluruh hak cipta dilindungi.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2 rounded-lg text-white/25 hover:text-[#4dd0e1] hover:bg-white/5 transition-all duration-300"
              style={{ border: "1px solid rgba(77, 208, 225, 0.08)" }}
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
