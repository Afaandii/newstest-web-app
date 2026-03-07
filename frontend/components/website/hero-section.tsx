import { Clock } from "lucide-react";
import type { NewsArticle } from "@/lib/dummy-news";

interface HeroSectionProps {
  main: NewsArticle;
  sidebar: NewsArticle;
}

export default function HeroSection({ main, sidebar }: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Article — Large (Centered weight) */}
        <div className="lg:col-span-3">
          <article className="group glass-water glass-shine border-none transition-all duration-700">
            <div className="grid grid-cols-1 md:grid-cols-5 h-full">
              {/* Text Side (3/5) */}
              <div className="md:col-span-3 p-8 flex flex-col justify-center border-r border-white/5">
                <span className="font-serif text-sm font-bold uppercase tracking-[0.3em] text-[#4dd0e1] mb-6 block">
                  {main.category}
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-[1.1] mb-6 group-hover:text-white/90 transition-colors duration-300">
                  {main.title}
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8 font-sans">
                  {main.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-widest text-white/40">
                  <span className="font-bold text-white/60">{main.author}</span>
                  <div className="flex items-center gap-2">
                    <Clock size={12} />
                    <span>{main.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Image Side (2/5) */}
              <div className="md:col-span-2 relative min-h-[300px] overflow-hidden bg-white/5">
                <img
                  src={main.imageUrl}
                  alt={main.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-transform duration-[2000ms] group-hover:scale-110"
                />
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar Article (1/4) - Very Newspaper Style */}
        <div className="lg:col-span-1 border-l border-white/10 pl-8 hidden lg:block">
          <div className="space-y-8">
            <div className="border-b border-white/10 pb-2">
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#4dd0e1]">Terbaru</h4>
            </div>
            <article className="group cursor-pointer">
              <h3 className="font-serif text-xl font-bold text-white leading-snug mb-3 group-hover:text-white/70 transition-colors">
                {sidebar.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-4 font-sans">
                {sidebar.excerpt}
              </p>
              <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/30">
                {sidebar.author} • {sidebar.readTime}
              </div>
            </article>
            <div className="nyt-divider" />
            {/* You could add more sidebar items here if dummy-news supported it */}
          </div>
        </div>
      </div>
    </section>
  );
}
