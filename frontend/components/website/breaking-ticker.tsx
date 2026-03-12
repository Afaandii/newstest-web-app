import { Zap } from "lucide-react";

interface BreakingNewsTickerProps {
  headlines?: string[];
}

const defaultHeadlines = [
  "NewsTest: Melayani Informasi Terpercaya Setiap Saat",
  "Dapatkan Berita Terupdate di Seluruh Penjuru Dunia",
];

export default function BreakingNewsTicker({ headlines = defaultHeadlines }: BreakingNewsTickerProps) {
  const displayHeadlines = headlines.length > 0 ? headlines : defaultHeadlines;

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div
        className="flex items-center gap-4 px-4 py-2.5 overflow-hidden border border-gray-200 bg-white"
      >
        {/* Badge */}
        <span
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
          style={{
            background: "#c41e2f",
            animation: "pulse-badge 2.5s ease-in-out infinite",
          }}
        >
          <Zap size={12} />
          Terkini
        </span>

        {/* Scrolling headlines */}
        <div className="overflow-hidden flex-1 relative">
          <div
            className="flex gap-12 whitespace-nowrap"
            style={{
              animation: "scroll-left 40s linear infinite",
            }}
          >
            {[...displayHeadlines, ...displayHeadlines].map((h, i) => (
              <span
                key={i}
                className="text-sm text-gray-700 hover:text-[#c41e2f] cursor-pointer transition-colors duration-300 font-sans"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
