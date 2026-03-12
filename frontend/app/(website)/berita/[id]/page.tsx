import { notFound } from "next/navigation";
import { getPostById, getPosts } from "@/lib/news";
import Link from "next/link";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import CommentsSection from "@/components/website/comments-section";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getPostById(id);

  if (!article) {
    notFound();
  }

  const allNews = await getPosts();
  const relatedNews = allNews
    .filter((a) => a.Category?.name === article.Category?.name && a.id_post !== article.id_post)
    .slice(0, 4);

  const paragraphs = article.content.split("\n\n").filter((p) => p.trim());

  return (
    <div className="min-h-screen" style={{ background: "#f8f8f8" }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="py-4 flex items-center gap-3 text-sm font-sans">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-500 hover:text-[#c41e2f] transition-colors"
          >
            <ArrowLeft size={14} />
            Beranda
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#c41e2f] font-semibold uppercase text-xs tracking-wider">
            {article.Category?.name || "News"}
          </span>
        </div>

        <div className="newspaper-section-rule" />

        {/* Article Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 pt-6">
          {/* Main Content */}
          <article className="lg:col-span-8 lg:border-r border-gray-200 lg:pr-10">
            {/* Category */}
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#c41e2f] font-sans mb-4">
              {article.Category?.name || "News"}
            </span>

            {/* Headline */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-[1.12] mb-5"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-sans mb-6 pb-5 border-b border-gray-200">
              <span className="font-bold text-gray-800">{article.User?.name || ""}</span>
              <span className="text-gray-300">|</span>
              <span>{new Date(article.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <button
                className="ml-auto flex items-center gap-1.5 text-gray-400 hover:text-[#c41e2f] transition-colors"
                aria-label="Share"
              >
                <Share2 size={14} />
                <span className="text-xs uppercase tracking-wider font-semibold">Bagikan</span>
              </button>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-video overflow-hidden bg-gray-100 mb-8">
              <img
                src={article.thumbnail || "/placeholder-news.jpg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="prose-newspaper max-w-none">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-gray-700 text-[17px] leading-[1.85] mb-6 font-serif ${
                    i === 0 ? "drop-cap" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-sans">
                  Topik:
                </span>
                <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer font-sans">
                  {article.Category?.name || "News"}
                </span>
              </div>
            </div>

            {/* Comments */}
            <CommentsSection />

            {/* Back link */}
            <div className="mt-8 pb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#c41e2f] hover:text-[#a01825] transition-colors font-sans"
              >
                <ArrowLeft size={16} />
                Kembali ke Beranda
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:pl-8 mt-8 lg:mt-0">
            <div className="sticky top-16 space-y-8">
              {/* Related News */}
              {relatedNews.length > 0 && (
                <div>
                  <div className="pb-2 mb-5">
                    <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#1a1a1a] font-sans">
                      Berita Terkait
                    </h3>
                    <div className="newspaper-divider-thick mt-2" style={{ height: "2px" }} />
                  </div>
                  <div className="space-y-5">
                    {relatedNews.map((related) => (
                      <Link
                        key={related.id_post}
                        href={`/berita/${related.id_post}`}
                        className="group block"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-16 overflow-hidden bg-gray-100">
                            <img
                              src={related.thumbnail || "/placeholder-news.jpg"}
                              alt={related.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className="text-sm font-bold text-[#1a1a1a] leading-snug line-clamp-2 group-hover:text-[#c41e2f] transition-colors"
                              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                            >
                              {related.title}
                            </h4>
                            <span className="text-[10px] text-gray-400 mt-1 block font-sans">
                              {new Date(related.created_at).toLocaleDateString("id-ID")}
                            </span>
                          </div>
                        </div>
                        <div className="newspaper-divider my-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Latest News */}
              <div>
                <div className="pb-2 mb-5">
                  <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#1a1a1a] font-sans">
                    Berita Terbaru
                  </h3>
                  <div className="newspaper-divider-thick mt-2" style={{ height: "2px" }} />
                </div>
                <div className="space-y-4">
                  {allNews
                    .filter((a) => a.id_post !== article.id_post)
                    .slice(0, 5)
                    .map((newsItem, i) => (
                      <Link
                        key={newsItem.id_post}
                        href={`/berita/${newsItem.id_post}`}
                        className="group block"
                      >
                        <div className="flex gap-3">
                          <span
                            className="text-2xl font-black text-gray-200 leading-none flex-shrink-0"
                            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold text-[#c41e2f] uppercase tracking-widest font-sans">
                              {newsItem.Category?.name || "News"}
                            </span>
                            <h4
                              className="text-sm font-bold text-[#1a1a1a] leading-tight mt-0.5 line-clamp-2 group-hover:text-[#c41e2f] transition-colors"
                              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                            >
                              {newsItem.title}
                            </h4>
                          </div>
                        </div>
                        <div className="newspaper-divider my-3" />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
