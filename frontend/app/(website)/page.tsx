import { getDummyNews } from "@/lib/dummy-news";
import HeroSection from "@/components/website/hero-section";
import BreakingNewsTicker from "@/components/website/breaking-ticker";
import NewsCard from "@/components/website/news-card";

export default function HomePage() {
  const news = getDummyNews();

  return (
    <>
      <div className="relative" style={{ zIndex: 1 }}>
        {/* === HERO: Featured + Sidebar === */}
        <HeroSection main={news[0]} sidebar={news[1]} />

        {/* === BREAKING NEWS TICKER === */}
        <BreakingNewsTicker />

        {/* === SECTION 1: Row of 3 cards === */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <SectionHeader title="Berita" highlight="Terkini" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(2, 5).map((article, i) => (
              <NewsCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </section>

        {/* === SECTION 2: Wide featured row (3 cards) === */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <SectionHeader title="Sorotan" highlight="Utama" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.slice(5, 8).map((article, i) => (
              <NewsCard key={article.id} article={article} index={i} variant="wide" />
            ))}
          </div>
        </section>

        {/* === SECTION 3: Another 3-col row === */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <SectionHeader title="Opini &" highlight="Analisis" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(8, 11).map((article, i) => (
              <NewsCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </section>

        {/* === SECTION 4: Last row === */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <SectionHeader title="Juga" highlight="Populer" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(11, 14).map((article, i) => (
              <NewsCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/* ===== Section Header Component ===== */
function SectionHeader({ title, highlight }: { title: string; highlight: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div
        className="h-px flex-1"
        style={{
          background: "linear-gradient(to right, rgba(77, 208, 225, 0.25), transparent)",
        }}
      />
      <h2 className="text-xl md:text-2xl font-bold text-white/90 tracking-tight">
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
