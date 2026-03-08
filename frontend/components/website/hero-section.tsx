import { Clock } from "lucide-react";
import type { NewsArticle } from "@/lib/dummy-news";

interface HeroSectionProps {
  main: NewsArticle;
  sidebar: NewsArticle;
}

export default function HeroSection({ main, sidebar }: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-6 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Main Article — Large Feature */}
        <div className="lg:col-span-9 lg:border-r border-gray-300 lg:pr-8">
          <article className="group">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Text Side */}
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c41e2f] mb-3 block font-sans">
                  {main.category}
                </span>
                <h2
                  className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] leading-[1.15] mb-5 group-hover:text-gray-700 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {main.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-5 font-serif drop-cap">
                  {main.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-widest text-gray-400">
                  <span className="font-bold text-gray-600">{main.author}</span>
                  <div className="flex items-center gap-2">
                    <Clock size={12} />
                    <span>{main.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={main.imageUrl}
                  alt={main.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar (3/12) */}
        <div className="lg:col-span-3 lg:pl-6 mt-6 lg:mt-0">
          <div className="space-y-5">
            {/* Section Header */}
            <div className="pb-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c41e2f] font-sans">
                Terbaru
              </h4>
              <div className="newspaper-divider-thick mt-2" style={{ height: "2px" }} />
            </div>

            {/* Sidebar Article */}
            <article className="group cursor-pointer">
              <h3
                className="text-xl font-bold text-[#1a1a1a] leading-snug mb-3 group-hover:text-gray-600 transition-colors"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {sidebar.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-4 font-serif">
                {sidebar.excerpt}
              </p>
              <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400">
                {sidebar.author} • {sidebar.readTime}
              </div>
            </article>
            <div className="newspaper-divider" />
          </div>
        </div>
      </div>
    </section>
  );
}
