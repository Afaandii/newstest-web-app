export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export function getDummyNews(): NewsArticle[] {
  return [
    // Featured / Hero
    {
      id: "1",
      title: "Revolusi AI Mengubah Lanskap Industri Teknologi Global",
      excerpt:
        "Kecerdasan buatan kini menjadi tulang punggung inovasi di berbagai sektor. Dari otomasi manufaktur hingga diagnosis medis, AI merevolusi cara kita bekerja dan menjalani kehidupan sehari-hari. Para ahli memperkirakan dampak ekonomi global AI akan mencapai $15 triliun pada tahun 2030.",
      category: "Teknologi",
      author: "Ahmad Fauzi",
      date: "6 Maret 2026",
      imageUrl: "https://picsum.photos/seed/newsai/800/500",
      readTime: "5 menit",
    },
    // Sidebar featured
    {
      id: "2",
      title: "Kebijakan Ekonomi Hijau: Langkah Besar Menuju Masa Depan Berkelanjutan",
      excerpt:
        "Pemerintah mengumumkan paket kebijakan ekonomi hijau senilai triliunan rupiah untuk mendorong transisi energi terbarukan dan mengurangi jejak karbon nasional secara signifikan.",
      category: "Ekonomi",
      author: "Siti Nurhaliza",
      date: "5 Maret 2026",
      imageUrl: "https://picsum.photos/seed/newseco/800/500",
      readTime: "4 menit",
    },
    // Row 1
    {
      id: "3",
      title: "Eksplorasi Laut Dalam Mengungkap Spesies Baru di Perairan Nusantara",
      excerpt:
        "Tim peneliti kelautan berhasil menemukan tiga spesies baru di kedalaman 2.000 meter perairan Indonesia timur, membuka cakrawala baru dalam ilmu biologi kelautan dunia.",
      category: "Sains",
      author: "Dr. Budi Santoso",
      date: "4 Maret 2026",
      imageUrl: "https://picsum.photos/seed/newssea/800/500",
      readTime: "6 menit",
    },
    {
      id: "4",
      title: "Timnas Indonesia Cetak Sejarah di Kualifikasi Piala Dunia 2026",
      excerpt:
        "Dengan kemenangan dramatis 3-2 atas juara bertahan, timnas Indonesia melangkah lebih dekat ke mimpi Piala Dunia, memicu euforia di seluruh penjuru tanah air.",
      category: "Olahraga",
      author: "Reza Pahlevi",
      date: "3 Maret 2026",
      imageUrl: "https://picsum.photos/seed/newssport/800/500",
      readTime: "3 menit",
    },
    {
      id: "5",
      title: "Tren Desain Interior 2026: Harmoni Alam dan Teknologi dalam Hunian Modern",
      excerpt:
        "Perpaduan material alami dengan teknologi smart home menjadi tren desain interior terkini, menciptakan ruang hidup yang nyaman, estetik, dan ramah lingkungan.",
      category: "Gaya Hidup",
      author: "Maya Anggraini",
      date: "2 Maret 2026",
      imageUrl: "https://picsum.photos/seed/newsdesign/800/500",
      readTime: "4 menit",
    },
    // Wide featured row
    {
      id: "6",
      title: "Wisata Bawah Laut Raja Ampat: Surga Tersembunyi di Timur Indonesia",
      excerpt:
        "Raja Ampat masih menjadi primadona wisata bahari dunia dengan keanekaragaman hayati laut yang belum tertandingi. Pemerintah berkomitmen menjaga ekosistem terumbu karangnya.",
      category: "Travel",
      author: "Dewi Lestari",
      date: "1 Maret 2026",
      imageUrl: "https://picsum.photos/seed/newsraja/800/500",
      readTime: "5 menit",
    },
    {
      id: "7",
      title: "Festival Kuliner Nusantara: Menyatukan Cita Rasa dari Sabang sampai Merauke",
      excerpt:
        "Ajang tahunan ini mempertemukan lebih dari 500 pelaku UMKM kuliner dari seluruh penjuru nusantara, menawarkan ragam sajian otentik yang memanjakan lidah.",
      category: "Kuliner",
      author: "Chef Andi",
      date: "28 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsfood/800/500",
      readTime: "3 menit",
    },
    {
      id: "8",
      title: "Startup Edtech Indonesia Raih Pendanaan Seri B Senilai $50 Juta",
      excerpt:
        "Platform belajar daring asal Indonesia berhasil meraih pendanaan dari investor global, membuktikan potensi besar pasar edukasi digital di Asia Tenggara.",
      category: "Bisnis",
      author: "Rina Kartika",
      date: "27 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsstartup/800/500",
      readTime: "4 menit",
    },
    // Row 3
    {
      id: "9",
      title: "Konser Musik Akustik di Tepi Danau Toba Menarik Ribuan Penonton",
      excerpt:
        "Konser musik akustik bertema 'Harmony of Nature' di tepi Danau Toba berhasil menarik lebih dari 10.000 penonton dari berbagai penjuru dunia.",
      category: "Hiburan",
      author: "Gilang Pratama",
      date: "26 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsconcert/800/500",
      readTime: "3 menit",
    },
    {
      id: "10",
      title: "Teknologi Purifikasi Air Terbaru Bisa Ubah Air Laut Jadi Air Minum",
      excerpt:
        "Para ilmuwan mengembangkan membran filtrasi generasi baru yang mampu mengubah air laut menjadi air minum dengan efisiensi energi 90% lebih hemat.",
      category: "Sains",
      author: "Prof. Hendra",
      date: "25 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newswater/800/500",
      readTime: "5 menit",
    },
    {
      id: "11",
      title: "Pasar Saham Asia Menguat di Tengah Optimisme Pemulihan Ekonomi",
      excerpt:
        "Indeks saham regional mencatat kenaikan signifikan seiring membaiknya data ekonomi dan kebijakan moneter yang mendukung pertumbuhan investasi.",
      category: "Ekonomi",
      author: "Fadli Rahman",
      date: "24 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsmarket/800/500",
      readTime: "4 menit",
    },
    // Row 4
    {
      id: "12",
      title: "Program Beasiswa Pendidikan untuk 10.000 Pelajar Daerah Terpencil",
      excerpt:
        "Kementerian Pendidikan meluncurkan program beasiswa komprehensif yang menargetkan pelajar dari daerah 3T untuk melanjutkan pendidikan tinggi.",
      category: "Pendidikan",
      author: "Nurul Aini",
      date: "23 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsschool/800/500",
      readTime: "4 menit",
    },
    {
      id: "13",
      title: "Inovasi Pertanian Vertikal: Solusi Ketahanan Pangan Perkotaan",
      excerpt:
        "Pertanian vertikal berbasis IoT mulai dikembangkan di berbagai kota besar Indonesia, menawarkan solusi produksi pangan yang efisien dan berkelanjutan.",
      category: "Teknologi",
      author: "Agus Setiawan",
      date: "22 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsfarm/800/500",
      readTime: "5 menit",
    },
    {
      id: "14",
      title: "Film Dokumenter Indonesia Raih Penghargaan di Festival Film Internasional",
      excerpt:
        "Karya sineas muda Indonesia mendapat pengakuan internasional dengan meraih penghargaan bergengsi di festival film dokumenter terbesar di Eropa.",
      category: "Hiburan",
      author: "Dian Sastro",
      date: "21 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsfilm/800/500",
      readTime: "3 menit",
    },
  ];
}
