import Link from "next/link";
import { getPosts } from "@/lib/news";
import HeroSection from "@/components/website/hero-section";
import BreakingNewsTicker from "@/components/website/breaking-ticker";
import NewsCard from "@/components/website/news-card";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const news = await getPosts();
  const { slug } = await params;

  // Map slug back to category name
  const categoryMap: { [key: string]: string } = {
    nasional: "Nasional",
    ekonomi: "Ekonomi",
    teknologi: "Teknologi",
    olahraga: "Olahraga",
    hiburan: "Hiburan",
    sains: "Sains",
    "gaya-hidup": "Gaya Hidup",
  };

  const categoryName = categoryMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  const filteredNews = news.filter(
    (a) => a.Category?.name.toLowerCase() === categoryName.toLowerCase()
  );

  // If no news, show empty state
  if (filteredNews.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4" style={{ background: "#f8f8f8" }}>
        <div className="max-w-7xl mx-auto text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
          <h3 className="text-xl font-bold text-gray-400">Belum ada berita di kategori {categoryName}.</h3>
          <Link href="/" className="inline-block mt-4 text-[#c41e2f] font-semibold hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen" style={{ background: "#f8f8f8", zIndex: 1 }}>
        <div className="relative max-w-7xl mx-auto">
          {/* === HERO: Using first two articles from category === */}
          <HeroSection 
            main={filteredNews[0]} 
            sidebar={filteredNews[1] || filteredNews[0]} 
          />

          {/* === BREAKING NEWS TICKER === */}
          <div className="px-4 py-2">
            <BreakingNewsTicker headlines={news.slice(0, 10).map(n => n.title)} />
          </div>

          {/* Divider */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="newspaper-divider" />
          </div>

          {/* === NEWSPAPER GRID LAYOUT === */}
          <main className="px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column (Main Content) */}
            <div className="md:col-span-9 space-y-10">
              <section>
                <SectionHeader title={categoryName} highlight="Terkini" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.slice(2).map((article, i) => (
                    <NewsCard key={article.id_post} article={article} index={i} />
                  ))}
                  {filteredNews.length <= 2 && (
                    <div className="col-span-full py-10 text-center text-gray-400 italic">
                      Menampilkan semua berita di kategori ini.
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column (Trending Sidebar - Global) */}
            <aside className="md:col-span-3 md:border-l border-gray-200 md:pl-6">
              <div className="sticky top-16 space-y-6">
                <div>
                  <div className="pb-2 mb-4">
                    <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-[#1a1a1a] font-sans">
                      Trending
                    </h4>
                    <div className="newspaper-divider-thick mt-2" style={{ height: "2px" }} />
                  </div>
                  <div className="space-y-5">
                    {news.slice(0, 5).map((article, i) => (
                      <Link key={article.id_post} href={`/berita/${article.id_post}`} className="group block">
                        <div className="flex gap-3">
                          <span className="text-3xl font-black text-gray-200 leading-none flex-shrink-0" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold text-[#c41e2f] uppercase tracking-widest font-sans">
                              {article.Category?.name || "News"}
                            </span>
                            <h4 className="text-base font-bold text-[#1a1a1a] leading-tight mt-1 group-hover:text-gray-500 transition-colors" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                              {article.title}
                            </h4>
                          </div>
                        </div>
                        <div className="newspaper-divider my-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}

/* ===== Section Header Component (Matching HomePage) ===== */
function SectionHeader({ title, highlight }: { title: string; highlight: string }) {
  return (
    <div className="mb-6">
      <div className="newspaper-section-rule mb-3" />
      <h2
        className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-tight"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {title}{" "}
        <span className="text-[#c41e2f]">{highlight}</span>
      </h2>
    </div>
  );
}
