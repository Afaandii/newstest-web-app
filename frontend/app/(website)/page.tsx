import Link from "next/link";
import { getPosts } from "@/lib/news";
import HeroSection from "@/components/website/hero-section";
import BreakingNewsTicker from "@/components/website/breaking-ticker";
import NewsCard from "@/components/website/news-card";

export default async function HomePage() {
  const news = await getPosts();

  // If no news at all, show a simple message
  if (news.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-400">Belum ada berita hari ini.</h2>
          <p className="text-gray-500 mt-2">Silakan hubungi admin atau kembali lagi nanti.</p>
        </div>
      </div>
    );
  }

  // Helper to filter news by category name (backend matching)
  const getByCategory = (names: string[]) => 
    news.filter(a => names.includes(a.Category?.name));

  return (
    <>
      <div className="relative min-h-screen" style={{ background: "#f8f8f8", zIndex: 1 }}>
        <div className="relative max-w-7xl mx-auto">
          {/* === HERO: Featured + Sidebar === */}
          <HeroSection main={news[0]} sidebar={news[1] || news[0]} />

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
              {/* Kabar Utama Section */}
              <section>
                <SectionHeader title="Kabar" highlight="Utama" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200 overflow-hidden">
                  {news.slice(2, 6).map((article, i) => (
                    <div key={article.id_post} className="bg-white">
                      <NewsCard article={article} index={i} />
                    </div>
                  ))}
                </div>
              </section>

              {/* Bisnis & Ekonomi Section */}
              <section>
                <SectionHeader title="Bisnis &" highlight="Ekonomi" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {getByCategory(["Bisnis", "Ekonomi"]).slice(0, 3).map((article, i) => (
                    <NewsCard key={article.id_post} article={article} index={i} />
                  ))}
                </div>
              </section>

              {/* Sains & Teknologi Section */}
              <section>
                <SectionHeader title="Sains &" highlight="Teknologi" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {getByCategory(["Sains", "Teknologi"]).slice(0, 3).map((article, i) => (
                    <NewsCard key={article.id_post} article={article} index={i} />
                  ))}
                </div>
              </section>

              {/* Gaya Hidup & Hiburan Section */}
              <section>
                <SectionHeader title="Gaya Hidup &" highlight="Hiburan" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {getByCategory(["Gaya Hidup", "Hiburan"]).slice(0, 3).map((article, i) => (
                    <NewsCard key={article.id_post} article={article} index={i} />
                  ))}
                </div>
              </section>

              {/* Berita Lainnya */}
              <section>
                <SectionHeader title="Berita" highlight="Lainnya" />
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {news.slice(6, 22).map((article) => (
                    <Link
                      key={article.id_post}
                      href={`/berita/${article.id_post}`}
                      className="group cursor-pointer py-3 border-b border-gray-100 block"
                    >
                      <p className="text-[10px] text-[#c41e2f] uppercase font-bold font-sans tracking-[0.1em]">
                        {article.Category?.name || "News"}
                      </p>
                      <h4
                        className="text-sm font-bold text-[#1a1a1a] mt-1 leading-tight group-hover:text-gray-500 transition-colors line-clamp-2"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        {article.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-2 font-sans">
                        {new Date(article.created_at).toLocaleDateString("id-ID")}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column (Trending Sidebar) */}
            <aside className="md:col-span-3 md:border-l border-gray-200 md:pl-6">
              <div className="sticky top-16 space-y-6">
                <div>
                  <div className="pb-2 mb-4">
                    <h4
                      className="text-sm font-bold uppercase tracking-[0.15em] text-[#1a1a1a] font-sans"
                    >
                      Trending
                    </h4>
                    <div className="newspaper-divider-thick mt-2" style={{ height: "2px" }} />
                  </div>
                  <div className="space-y-5">
                    {news.slice(0, 5).map((article, i) => (
                      <Link
                        key={article.id_post}
                        href={`/berita/${article.id_post}`}
                        className="group block"
                      >
                        <div className="flex gap-3">
                          <span
                            className="text-3xl font-black text-gray-200 leading-none flex-shrink-0"
                            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold text-[#c41e2f] uppercase tracking-widest font-sans">
                              {article.Category?.name || "News"}
                            </span>
                            <h4
                              className="text-base font-bold text-[#1a1a1a] leading-tight mt-1 group-hover:text-gray-500 transition-colors"
                              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                            >
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

/* ===== Section Header Component ===== */
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
