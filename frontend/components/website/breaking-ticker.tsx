import { Zap } from "lucide-react";

const headlines = [
  "Harga Emas Dunia Tembus Rekor Tertinggi Sepanjang Masa",
  "Gempa M5.2 Guncang Sulawesi, Tidak Berpotensi Tsunami",
  "Menteri Pendidikan Umumkan Kurikulum Baru Berbasis AI",
  "SpaceX Berhasil Luncurkan Misi ke Mars untuk Pertama Kali",
  "Rupiah Menguat Signifikan di Tengah Stabilitas Ekonomi Global",
];

export default function BreakingNewsTicker() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div
        className="flex items-center gap-4 px-5 py-3 overflow-hidden"
        style={{
          background: "rgba(77, 208, 225, 0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "1rem",
          border: "1px solid rgba(77, 208, 225, 0.12)",
          boxShadow:
            "0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(77, 208, 225, 0.06)",
        }}
      >
        {/* Badge */}
        <span
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white"
          style={{
            background: "linear-gradient(135deg, #4dd0e1, #00897b)",
            borderRadius: "0.6rem",
            boxShadow: "0 2px 10px rgba(77, 208, 225, 0.3)",
            animation: "pulse-glow 2.5s ease-in-out infinite",
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
              animation: "scroll-left 30s linear infinite",
            }}
          >
            {[...headlines, ...headlines].map((h, i) => (
              <span
                key={i}
                className="text-sm text-white/60 hover:text-[#4dd0e1] cursor-pointer transition-colors duration-300"
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
