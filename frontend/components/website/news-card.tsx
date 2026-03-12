import Link from "next/link";
import type { Post } from "@/lib/news";

interface NewsCardProps {
  article: Post;
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
function DefaultCard({ article }: { article: Post; index: number }) {
  return (
    <Link href={`/berita/${article.id_post}`} className="block">
      <article className="group flex flex-col p-5 bg-white border-b border-gray-200 transition-colors duration-300 hover:bg-gray-50 h-full">
        <div className="flex flex-col h-full">
          {/* Category */}
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#c41e2f] mb-2 font-sans">
            {article.Category?.name || "News"}
          </span>

          {/* Headline */}
          <h3
            className="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-tight mb-3 group-hover:text-gray-600 transition-colors duration-300"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {article.title}
          </h3>

          {/* Image */}
          <div className="relative aspect-video overflow-hidden mb-4 bg-gray-100">
            <img
              src={article.thumbnail || "/placeholder-news.jpg"}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed mb-5 font-serif line-clamp-3">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-sans uppercase tracking-widest text-gray-400">
            <span className="font-bold text-gray-600">{article.User?.name || ""}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ========== Wide Card ========== */
function WideCard({ article }: { article: Post; index: number }) {
  return (
    <Link href={`/berita/${article.id_post}`} className="block">
      <article className="group relative cursor-pointer bg-white border border-gray-200 transition-all duration-300 hover:shadow-md overflow-hidden">
        <div className="relative h-56 overflow-hidden">
          <img
            src={article.thumbnail || "/placeholder-news.jpg"}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)",
            }}
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-[#c41e2f]">
              {article.Category?.name || "News"}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3
              className="text-base font-bold text-white leading-snug group-hover:text-gray-200 transition-colors duration-300"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {article.title}
            </h3>
            <p className="text-white/60 text-xs mt-2 line-clamp-2 font-sans">
              {article.excerpt}
            </p>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between text-[11px] text-gray-400 font-sans bg-white">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-[#1a1a1a]">
              {(article.User?.name || "A").charAt(0)}
            </div>
            <span className="text-gray-600">{article.User?.name || ""}</span>
          </div>
          <span>{new Date(article.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </article>
    </Link>
  );
}

/* ========== Compact Card (horizontal) ========== */
function CompactCard({ article }: { article: Post }) {
  return (
    <Link href={`/berita/${article.id_post}`} className="block">
      <article className="group flex gap-4 cursor-pointer transition-colors duration-300 p-3 border-b border-gray-100 hover:bg-gray-50">
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-100">
          <img
            src={article.thumbnail || "/placeholder-news.jpg"}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c41e2f] font-sans">
            {article.Category?.name || "News"}
          </span>
          <h4
            className="text-sm font-semibold text-[#1a1a1a] leading-snug mt-0.5 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {article.title}
          </h4>
          <span className="text-[10px] text-gray-400 mt-1 block font-sans">
            {new Date(article.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </article>
    </Link>
  );
}
