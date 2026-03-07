import { getDummyNews } from "@/lib/dummy-news";
import HeroSection from "@/components/website/hero-section";
import BreakingNewsTicker from "@/components/website/breaking-ticker";
import NewsCard from "@/components/website/news-card";

export default function HomePage() {
  const news = getDummyNews();

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-[#00ffff]/10 via-[#081423] to-[#008b8b]/20" style={{ zIndex: 1 }}>
        {/* Transparent background overlay for depth */}
        <div className="fixed inset-0 bg-[#00ffff]/5 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* === HERO: Featured + Sidebar === */}
          <HeroSection main={news[0]} sidebar={news[1]} />

          {/* === BREAKING NEWS TICKER === */}
          <div className="px-4 py-4">
            <BreakingNewsTicker />
          </div>

          <div className="nyt-divider mx-4" />

          {/* === NEWSPAPER GRID LAYOUT === */}
          <main className="px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column (Main Content) */}
            <div className="md:col-span-9 space-y-16">
              {/* Kabar Utama Section (Already exists but updated slice) */}
              <section>
                <SectionHeader title="Kabar" highlight="Utama" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
                  {news.slice(2, 6).map((article, i) => (
                    <div key={article.id} className="bg-[#081423]">
                      <NewsCard article={article} index={i} />
                    </div>
                  ))}
                </div>
              </section>

              {/* Bisnis & Ekonomi Section */}
              <section>
                <SectionHeader title="Bisnis &" highlight="Ekonomi" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {news.filter(a => a.category === "Bisnis" || a.category === "Ekonomi").slice(0, 3).map((article, i) => (
                    <NewsCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              </section>

              {/* Sains & Teknologi Section */}
              <section>
                <SectionHeader title="Sains &" highlight="Teknologi" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {news.filter(a => a.category === "Sains" || a.category === "Teknologi").slice(1, 4).map((article, i) => (
                    <NewsCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              </section>

              {/* Gaya Hidup & Hiburan Section */}
              <section>
                <SectionHeader title="Gaya Hidup &" highlight="Hiburan" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {news.filter(a => a.category === "Gaya Hidup" || a.category === "Hiburan").map((article, i) => (
                    <NewsCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              </section>

              {/* Berita Lainnya (Catch-all for remaining data) */}
              <section>
                <SectionHeader title="Berita" highlight="Lainnya" />
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {news.slice(14, 32).map((article, i) => (
                    <div key={article.id} className="group cursor-pointer">
                      <p className="font-serif text-[10px] text-[#4dd0e1] uppercase font-bold">{article.category}</p>
                      <h4 className="font-serif text-sm font-bold text-white mt-1 leading-tight group-hover:text-white/70 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-[10px] text-white/40 mt-2">{article.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column (Trending Sidebar) */}
            <aside className="md:col-span-3">
              <div className="sticky top-24 space-y-8">
                <div>
                  <div className="border-b-2 border-white/10 pb-2 mb-6">
                    <h4 className="font-serif text-sm font-bold uppercase tracking-[0.2em] text-white">Trending</h4>
                  </div>
                  <div className="space-y-6">
                    {news.slice(9, 14).map((article) => (
                      <article key={article.id} className="group cursor-pointer">
                        <span className="font-serif text-[10px] font-bold text-[#4dd0e1] uppercase tracking-widest">
                          {article.category}
                        </span>
                        <h4 className="font-serif text-base font-bold text-white leading-tight mt-1 group-hover:text-white/70 transition-colors">
                          {article.title}
                        </h4>
                        <div className="nyt-divider my-4 opacity-30" />
                      </article>
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
    <div className="flex items-center gap-4 mb-8">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-white/90 tracking-tight">
        {title}{" "}
        <span style={{ color: "#4dd0e1" }}>{highlight}</span>
      </h2>
      <div
        className="h-px flex-1"
        style={{
          background: "linear-gradient(to left, rgba(77, 208, 225, 0.25), transparent)",
        }}
      />
    </div>
  );
}
