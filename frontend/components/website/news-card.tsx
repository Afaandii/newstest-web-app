import { Clock } from "lucide-react";
import type { NewsArticle } from "@/lib/dummy-news";

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
  variant?: "default" | "wide" | "compact";
}

export default function NewsCard({ article, index = 0, variant = "default" }: NewsCardProps) {
  if (variant === "wide") {
    return <WideCard article={article} index={index} />;
  }
  if (variant === "compact") {
    return <CompactCard article={article} />;
  }
  return <DefaultCard article={article} index={index} />;
}

/* ========== Default Card ========== */
function DefaultCard({ article }: { article: NewsArticle; index: number }) {
  return (
    <article className="group glass-water glass-shine rounded-none border-x-0 border-t-1 border-b-1 flex flex-col p-5 transition-all duration-500 hover:bg-white/[0.05]">
      <div className="flex flex-col h-full">
        {/* Category */}
        <span className="font-serif text-[11px] font-bold uppercase tracking-[0.2em] text-[#4dd0e1] mb-2">
          {article.category}
        </span>

        {/* Headline */}
        <h3 className="font-serif text-xl md:text-2xl font-bold text-white leading-tight mb-3 group-hover:text-white/80 transition-colors duration-300">
          {article.title}
        </h3>

        {/* Image - Conditional or bottom */}
        <div className="relative aspect-video overflow-hidden mb-4 bg-white/5">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Excerpt */}
        <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans line-clamp-3">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-sans uppercase tracking-widest text-white/40">
          <span className="font-bold">{article.author}</span>
          <div className="flex items-center gap-2">
            <Clock size={10} />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ========== Wide Card ========== */
function WideCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <article
      className="group relative cursor-pointer transition-all duration-500 hover:-translate-y-1"
      style={{
        background: "rgba(77, 208, 225, 0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "1rem",
        border: "1px solid rgba(77, 208, 225, 0.08)",
        boxShadow:
          "0 4px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(77, 208, 225, 0.06)",
        animationDelay: `${index * 0.2}s`,
      }}
    >
      <div
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          borderRadius: "1rem",
          background:
            "linear-gradient(135deg, rgba(77, 208, 225, 0.2), transparent, rgba(77, 208, 225, 0.2))",
          filter: "blur(1px)",
        }}
      />
      <div className="relative overflow-hidden" style={{ borderRadius: "1rem" }}>
        <div className="relative h-56 overflow-hidden" style={{ borderRadius: "1rem 1rem 0 0" }}>
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8, 20, 35, 0.9) 0%, rgba(8, 20, 35, 0.2) 50%, transparent 80%)",
            }}
          />
          <div className="absolute top-3 left-3">
            <span
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
              style={{
                background: "rgba(77, 208, 225, 0.2)",
                backdropFilter: "blur(8px)",
                borderRadius: "0.5rem",
                border: "1px solid rgba(77, 208, 225, 0.25)",
              }}
            >
              {article.category}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#4dd0e1] transition-colors duration-300">
              {article.title}
            </h3>
            <p className="text-white/40 text-xs mt-2 line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between text-[11px] text-white/35">
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #4dd0e1, #00897b)" }}
            >
              {article.author.charAt(0)}
            </div>
            <span className="text-white/50">{article.author}</span>
          </div>
          <span>{article.date}</span>
        </div>
      </div>
    </article>
  );
}

/* ========== Compact Card (horizontal) ========== */
function CompactCard({ article }: { article: NewsArticle }) {
  return (
    <article
      className="group flex gap-4 cursor-pointer transition-all duration-300 hover:translate-x-1 p-3"
      style={{
        background: "rgba(77, 208, 225, 0.04)",
        borderRadius: "0.75rem",
        border: "1px solid rgba(77, 208, 225, 0.06)",
      }}
    >
      <div className="flex-shrink-0 w-20 h-20 overflow-hidden" style={{ borderRadius: "0.6rem" }}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#4dd0e1" }}>
          {article.category}
        </span>
        <h4 className="text-sm font-semibold text-white/80 leading-snug mt-0.5 line-clamp-2 group-hover:text-[#4dd0e1] transition-colors duration-300">
          {article.title}
        </h4>
        <span className="text-[10px] text-white/30 mt-1 block">{article.date}</span>
      </div>
    </article>
  );
}
