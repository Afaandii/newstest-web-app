import Link from "next/link";
import { getDummyNews } from "@/lib/dummy-news";
import NewsCard from "@/components/website/news-card";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const news = getDummyNews();
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
    (a) => a.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="min-h-screen py-10 px-4 md:px-0" style={{ background: "#f8f8f8" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="newspaper-section-rule mb-4" />
          <h1
            className="text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Kategori: <span className="text-[#c41e2f]">{categoryName}</span>
          </h1>
          <p className="text-gray-500 mt-2 font-sans text-sm uppercase tracking-widest">
            Menampilkan {filteredNews.length} berita terbaru
          </p>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article, i) => (
              <NewsCard key={article.id} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <h3 className="text-xl font-bold text-gray-400">Belum ada berita di kategori ini.</h3>
            <Link 
              href="/" 
              className="inline-block mt-4 text-[#c41e2f] font-semibold hover:underline"
            >
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
