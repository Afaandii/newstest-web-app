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
    <footer className="relative mt-8 bg-[#1a1a1a]">

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span
                className="text-2xl font-black text-white"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                NewsTest
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Portal berita terpercaya dengan informasi terkini dan terdalam
              dari berbagai sudut pandang.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 text-gray-500 hover:text-white transition-colors duration-300 border border-gray-700 hover:border-gray-500"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#c41e2f]">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
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
        <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-700">
          <p className="text-[11px] text-gray-500">
            © 2026 NewsTest. Seluruh hak cipta dilindungi.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 text-gray-500 hover:text-white border border-gray-700 hover:border-gray-500 transition-colors duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
