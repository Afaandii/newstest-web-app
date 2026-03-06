import { Clock } from "lucide-react";
import type { NewsArticle } from "@/lib/dummy-news";

interface HeroSectionProps {
  main: NewsArticle;
  sidebar: NewsArticle;
}

export default function HeroSection({ main, sidebar }: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Article — Large */}
        <div className="lg:col-span-2">
          <article
            className="group relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.005]"
            style={{
              background: "rgba(77, 208, 225, 0.06)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "1rem",
              border: "1px solid rgba(77, 208, 225, 0.1)",
              boxShadow:
                "0 8px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(77, 208, 225, 0.08)",
            }}
          >
            {/* Image */}
            <div className="relative h-72 md:h-80 overflow-hidden" style={{ borderRadius: "1rem 1rem 0 0" }}>
              <img
                src={main.imageUrl}
                alt={main.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8, 20, 35, 0.9) 0%, rgba(8, 20, 35, 0.3) 40%, transparent 70%)",
                }}
              />
              {/* Category */}
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white"
                  style={{
                    background: "rgba(77, 208, 225, 0.25)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "0.6rem",
                    border: "1px solid rgba(77, 208, 225, 0.3)",
                  }}
                >
                  {main.category}
                </span>
              </div>
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight group-hover:text-[#4dd0e1] transition-colors duration-300">
                  {main.title}
                </h2>
              </div>
            </div>

            {/* Text content */}
            <div className="p-6">
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-4 first-letter:text-3xl first-letter:font-bold first-letter:text-[#4dd0e1] first-letter:mr-1 first-letter:float-left">
                {main.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-white/40">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #4dd0e1, #00897b)" }}
                >
                  {main.author.charAt(0)}
                </div>
                <span className="font-medium text-white/60">{main.author}</span>
                <span>•</span>
                <span>{main.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {main.readTime}
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar Article */}
        <div className="lg:col-span-1">
          <article
            className="group relative h-full overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.01]"
            style={{
              background: "rgba(77, 208, 225, 0.06)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "1rem",
              border: "1px solid rgba(77, 208, 225, 0.1)",
              boxShadow:
                "0 8px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(77, 208, 225, 0.08)",
            }}
          >
            <div className="relative h-52 overflow-hidden" style={{ borderRadius: "1rem 1rem 0 0" }}>
              <img
                src={sidebar.imageUrl}
                alt={sidebar.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8, 20, 35, 0.9) 0%, transparent 60%)",
                }}
              />
              <div className="absolute top-3 left-3">
                <span
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                  style={{
                    background: "rgba(77, 208, 225, 0.25)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "0.6rem",
                    border: "1px solid rgba(77, 208, 225, 0.3)",
                  }}
                >
                  {sidebar.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-[#4dd0e1] transition-colors duration-300">
                {sidebar.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-3">
                {sidebar.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-white/40">
                <span className="font-medium text-white/60">{sidebar.author}</span>
                <span>•</span>
                <span>{sidebar.date}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
