export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

function generateContent(excerpt: string): string {
  return `${excerpt}

Perkembangan ini menjadi perhatian serius berbagai pihak, baik dari kalangan akademisi, praktisi industri, maupun pembuat kebijakan. Berbagai forum diskusi dan seminar telah diadakan untuk membahas implikasi jangka panjang dari fenomena ini terhadap masyarakat luas.

Para pengamat menilai bahwa langkah-langkah strategis perlu segera diambil untuk memastikan dampak positif dapat dimaksimalkan. Kolaborasi antara sektor publik dan swasta dinilai menjadi kunci keberhasilan dalam menghadapi tantangan yang ada.

Di sisi lain, masyarakat juga diharapkan dapat berpartisipasi aktif dalam proses ini. Kesadaran dan pemahaman yang baik dari seluruh lapisan masyarakat akan sangat menentukan keberhasilan implementasi di lapangan.

Ke depan, diharapkan sinergi antara berbagai pemangku kepentingan dapat terus ditingkatkan. Dengan pendekatan yang komprehensif dan inklusif, Indonesia optimis mampu memanfaatkan momentum ini untuk kemajuan bangsa yang lebih baik.`;
}

export function getDummyNews(): NewsArticle[] {
  return [
    {
      id: "1",
      title: "Revolusi AI Mengubah Lanskap Industri Teknologi Global",
      excerpt:
        "Kecerdasan buatan kini menjadi tulang punggung inovasi di berbagai sektor. Dari otomasi manufaktur hingga diagnosis medis, AI merevolusi cara kita bekerja dan menjalani kehidupan sehari-hari. Para ahli memperkirakan dampak ekonomi global AI akan mencapai $15 triliun pada tahun 2030.",
      content: `Kecerdasan buatan kini menjadi tulang punggung inovasi di berbagai sektor. Dari otomasi manufaktur hingga diagnosis medis, AI merevolusi cara kita bekerja dan menjalani kehidupan sehari-hari. Para ahli memperkirakan dampak ekonomi global AI akan mencapai $15 triliun pada tahun 2030.

Dalam beberapa tahun terakhir, perkembangan teknologi AI telah melampaui ekspektasi banyak pihak. Model bahasa besar (Large Language Models) kini mampu menghasilkan teks, kode, dan analisis yang setara dengan kemampuan manusia profesional. Revolusi ini tidak hanya terbatas pada industri teknologi, tetapi juga merambah ke sektor kesehatan, pendidikan, dan keuangan.

Di Indonesia, adopsi AI di kalangan perusahaan rintisan (startup) dan korporasi besar terus meningkat. Menurut data Kementerian Komunikasi dan Informatika, lebih dari 200 perusahaan Indonesia telah mengintegrasikan solusi AI ke dalam operasional bisnis mereka sepanjang tahun 2025.

Namun, perkembangan pesat ini juga menimbulkan kekhawatiran terkait dampak sosial, terutama dalam hal ketenagakerjaan. Beberapa sektor diprediksi akan mengalami pergeseran kebutuhan tenaga kerja yang signifikan. Para pakar menyarankan agar sistem pendidikan segera beradaptasi untuk mempersiapkan generasi mendatang menghadapi era AI.

"Kita harus melihat AI sebagai alat bantu, bukan ancaman. Kuncinya adalah bagaimana kita memanfaatkan teknologi ini untuk meningkatkan produktivitas dan kualitas hidup," ujar Prof. Dr. Bambang Riyanto, pakar AI dari Institut Teknologi Bandung.

Ke depan, kolaborasi antara pemerintah, akademisi, dan sektor swasta menjadi sangat penting untuk memastikan bahwa manfaat revolusi AI dapat dirasakan secara merata oleh seluruh lapisan masyarakat Indonesia.`,
      category: "Teknologi",
      author: "Ahmad Fauzi",
      date: "6 Maret 2026",
      imageUrl: "https://picsum.photos/seed/newsai/800/500",
      readTime: "5 menit",
    },
    {
      id: "2",
      title: "Kebijakan Ekonomi Hijau: Langkah Besar Menuju Masa Depan Berkelanjutan",
      excerpt:
        "Pemerintah mengumumkan paket kebijakan ekonomi hijau senilai triliunan rupiah untuk mendorong transisi energi terbarukan dan mengurangi jejak karbon nasional secara signifikan.",
      content: generateContent("Pemerintah mengumumkan paket kebijakan ekonomi hijau senilai triliunan rupiah untuk mendorong transisi energi terbarukan dan mengurangi jejak karbon nasional secara signifikan."),
      category: "Ekonomi",
      author: "Siti Nurhaliza",
      date: "5 Maret 2026",
      imageUrl: "https://picsum.photos/seed/newseco/800/500",
      readTime: "4 menit",
    },
    {
      id: "3",
      title: "Eksplorasi Laut Dalam Mengungkap Spesies Baru di Perairan Nusantara",
      excerpt:
        "Tim peneliti kelautan berhasil menemukan tiga spesies baru di kedalaman 2.000 meter perairan Indonesia timur, membuka cakrawala baru dalam ilmu biologi kelautan dunia.",
      content: generateContent("Tim peneliti kelautan berhasil menemukan tiga spesies baru di kedalaman 2.000 meter perairan Indonesia timur, membuka cakrawala baru dalam ilmu biologi kelautan dunia."),
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
      content: generateContent("Dengan kemenangan dramatis 3-2 atas juara bertahan, timnas Indonesia melangkah lebih dekat ke mimpi Piala Dunia, memicu euforia di seluruh penjuru tanah air."),
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
      content: generateContent("Perpaduan material alami dengan teknologi smart home menjadi tren desain interior terkini, menciptakan ruang hidup yang nyaman, estetik, dan ramah lingkungan."),
      category: "Gaya Hidup",
      author: "Maya Anggraini",
      date: "2 Maret 2026",
      imageUrl: "https://picsum.photos/seed/newsdesign/800/500",
      readTime: "4 menit",
    },
    {
      id: "6",
      title: "Wisata Bawah Laut Raja Ampat: Surga Tersembunyi di Timur Indonesia",
      excerpt:
        "Raja Ampat masih menjadi primadona wisata bahari dunia dengan keanekaragaman hayati laut yang belum tertandingi. Pemerintah berkomitmen menjaga ekosistem terumbu karangnya.",
      content: generateContent("Raja Ampat masih menjadi primadona wisata bahari dunia dengan keanekaragaman hayati laut yang belum tertandingi. Pemerintah berkomitmen menjaga ekosistem terumbu karangnya."),
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
      content: generateContent("Ajang tahunan ini mempertemukan lebih dari 500 pelaku UMKM kuliner dari seluruh penjuru nusantara, menawarkan ragam sajian otentik yang memanjakan lidah."),
      category: "Hiburan",
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
      content: generateContent("Platform belajar daring asal Indonesia berhasil meraih pendanaan dari investor global, membuktikan potensi besar pasar edukasi digital di Asia Tenggara."),
      category: "Teknologi",
      author: "Rina Kartika",
      date: "27 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsstartup/800/500",
      readTime: "4 menit",
    },
    {
      id: "9",
      title: "Konser Musik Akustik di Tepi Danau Toba Menarik Ribuan Penonton",
      excerpt:
        "Konser musik akustik bertema 'Harmony of Nature' di tepi Danau Toba berhasil menarik lebih dari 10.000 penonton dari berbagai penjuru dunia.",
      content: generateContent("Konser musik akustik bertema 'Harmony of Nature' di tepi Danau Toba berhasil menarik lebih dari 10.000 penonton dari berbagai penjuru dunia."),
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
      content: generateContent("Para ilmuwan mengembangkan membran filtrasi generasi baru yang mampu mengubah air laut menjadi air minum dengan efisiensi energi 90% lebih hemat."),
      category: "Sains",
      author: "Prof. Hendra",
      date: "25 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newswatar/800/500",
      readTime: "5 menit",
    },
    {
      id: "11",
      title: "Pasar Saham Asia Menguat di Tengah Optimisme Pemulihan Ekonomi",
      excerpt:
        "Indeks saham regional mencatat kenaikan signifikan seiring membaiknya data ekonomi dan kebijakan moneter yang mendukung pertumbuhan investasi.",
      content: generateContent("Indeks saham regional mencatat kenaikan signifikan seiring membaiknya data ekonomi dan kebijakan moneter yang mendukung pertumbuhan investasi."),
      category: "Ekonomi",
      author: "Fadli Rahman",
      date: "24 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsmarket/800/500",
      readTime: "4 menit",
    },
    {
      id: "12",
      title: "Program Beasiswa Pendidikan untuk 10.000 Pelajar Daerah Terpencil",
      excerpt:
        "Kementerian Pendidikan meluncurkan program beasiswa komprehensif yang menargetkan pelajar dari daerah 3T untuk melanjutkan pendidikan tinggi.",
      content: generateContent("Kementerian Pendidikan meluncurkan program beasiswa komprehensif yang menargetkan pelajar dari daerah 3T untuk melanjutkan pendidikan tinggi."),
      category: "Nasional",
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
      content: generateContent("Pertanian vertikal berbasis IoT mulai dikembangkan di berbagai kota besar Indonesia, menawarkan solusi produksi pangan yang efisien dan berkelanjutan."),
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
      content: generateContent("Karya sineas muda Indonesia mendapat pengakuan internasional dengan meraih penghargaan bergengsi di festival film dokumenter terbesar di Eropa."),
      category: "Hiburan",
      author: "Dian Sastro",
      date: "21 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsfilm/800/500",
      readTime: "3 menit",
    },
    {
      id: "15",
      title: "Kendaraan Listrik Nasional Siap Meluncur ke Pasar Global",
      excerpt:
        "Produsen otomotif dalam negeri bersiap mengekspor unit kendaraan listrik pertamanya ke pasar mancanegara, menandai era baru industri otomotif Indonesia.",
      content: generateContent("Produsen otomotif dalam negeri bersiap mengekspor unit kendaraan listrik pertamanya ke pasar mancanegara, menandai era baru industri otomotif Indonesia."),
      category: "Ekonomi",
      author: "Irwan Suwandi",
      date: "20 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsev/800/500",
      readTime: "5 menit",
    },
    {
      id: "16",
      title: "Pemanfaatan Mangrove sebagai Benteng Alami Abrasi Pantai",
      excerpt:
        "Upaya restorasi hutan mangrove di pesisir utara Jawa membuahkan hasil positif dalam menekan laju abrasi dan memulihkan ekosistem pesisir.",
      content: generateContent("Upaya restorasi hutan mangrove di pesisir utara Jawa membuahkan hasil positif dalam menekan laju abrasi dan memulihkan ekosistem pesisir."),
      category: "Sains",
      author: "Lestari Wahyuni",
      date: "19 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsmangrove/800/500",
      readTime: "4 menit",
    },
    {
      id: "17",
      title: "Eksplorasi Ruang Angkasa: Satelit Indonesia Sukses Mengorbit",
      excerpt:
        "Satelit komunikasi generasi terbaru milik Indonesia berhasil mencapai orbit targetnya, siap memperluas konektivitas internet ke pelosok negeri.",
      content: generateContent("Satelit komunikasi generasi terbaru milik Indonesia berhasil mencapai orbit targetnya, siap memperluas konektivitas internet ke pelosok negeri."),
      category: "Sains",
      author: "Bambang Susanto",
      date: "18 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newssat/800/500",
      readTime: "6 menit",
    },
    {
      id: "18",
      title: "Kebangkitan Industri Kreatif Lokal di Pasar Digital Internasional",
      excerpt:
        "Produk kerajinan tangan khas daerah mulai mendominasi platform e-commerce global, menunjukkan daya saing produk kreatif Indonesia di kancah dunia.",
      content: generateContent("Produk kerajinan tangan khas daerah mulai mendominasi platform e-commerce global, menunjukkan daya saing produk kreatif Indonesia di kancah dunia."),
      category: "Ekonomi",
      author: "Anita Kusuma",
      date: "17 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newscraft/800/500",
      readTime: "4 menit",
    },
    {
      id: "19",
      title: "Terapi Genetik Terbaru Berikan Harapan bagi Penderita Penyakit Langka",
      excerpt:
        "Para peneliti medis mengumumkan kemajuan signifikan dalam terapi gen yang mampu memperbaiki kerusakan genetik pada pasien dengan kondisi kesehatan langka.",
      content: generateContent("Para peneliti medis mengumumkan kemajuan signifikan dalam terapi gen yang mampu memperbaiki kerusakan genetik pada pasien dengan kondisi kesehatan langka."),
      category: "Sains",
      author: "Dr. Linda",
      date: "16 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsmed/800/500",
      readTime: "7 menit",
    },
    {
      id: "20",
      title: "Arsitektur Ramah Lingkungan Jadi Standar Baru Pembangunan Kota",
      excerpt:
        "Konsep gedung hijau yang hemat energi dan menggunakan material berkelanjutan kini menjadi syarat wajib bagi setiap pembangunan properti baru di Jakarta.",
      content: generateContent("Konsep gedung hijau yang hemat energi dan menggunakan material berkelanjutan kini menjadi syarat wajib bagi setiap pembangunan properti baru di Jakarta."),
      category: "Gaya Hidup",
      author: "Hendra Wijaya",
      date: "15 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsarch/800/500",
      readTime: "5 menit",
    },
    {
      id: "21",
      title: "Festival Wayang Kulit Goes Digital: Menjangkau Generasi Z",
      excerpt:
        "Pertunjukan wayang kulit klasik kini hadir dalam format streaming interaktif, menarik perhatian jutaan generasi muda untuk mengenal warisan budaya bangsa.",
      content: generateContent("Pertunjukan wayang kulit klasik kini hadir dalam format streaming interaktif, menarik perhatian jutaan generasi muda untuk mengenal warisan budaya bangsa."),
      category: "Hiburan",
      author: "Ki Bayu",
      date: "14 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newswayang/800/500",
      readTime: "4 menit",
    },
    {
      id: "22",
      title: "Inovasi Plastik Biodegradable dari Limbah Pertanian",
      excerpt:
        "Sekelompok mahasiswa berhasil menciptakan bahan pengganti plastik yang mudah terurai dan aman bagi lingkungan menggunakan limbah serat tebu.",
      content: generateContent("Sekelompok mahasiswa berhasil menciptakan bahan pengganti plastik yang mudah terurai dan aman bagi lingkungan menggunakan limbah serat tebu."),
      category: "Teknologi",
      author: "Siska Amelia",
      date: "13 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsplastic/800/500",
      readTime: "3 menit",
    },
    {
      id: "23",
      title: "Peran Olahraga dalam Meningkatkan Kesehatan Mental Masyarakat",
      excerpt:
        "Penelitian terbaru menunjukkan korelasi kuat antara aktivitas fisik rutin dengan penurunan tingkat stres dan kecemasan di masa pasca-pandemi.",
      content: generateContent("Penelitian terbaru menunjukkan korelasi kuat antara aktivitas fisik rutin dengan penurunan tingkat stres dan kecemasan di masa pasca-pandemi."),
      category: "Olahraga",
      author: "Rendy Pratama",
      date: "12 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsmental/800/500",
      readTime: "4 menit",
    },
    {
      id: "24",
      title: "Peluncuran Moda Transportasi Cepat Lintas Provinsi",
      excerpt:
        "Layanan kereta cepat antar kota resmi beroperasi hari ini, memangkas waktu tempuh perjalanan secara drastis dan meningkatkan efisiensi mobilitas warga.",
      content: generateContent("Layanan kereta cepat antar kota resmi beroperasi hari ini, memangkas waktu tempuh perjalanan secara drastis dan meningkatkan efisiensi mobilitas warga."),
      category: "Nasional",
      author: "Anton Surya",
      date: "11 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newstrain/800/500",
      readTime: "5 menit",
    },
    {
      id: "25",
      title: "Tren Fashion Muslim Indonesia Kuasai Catwalk Dunia",
      excerpt:
        "Desainer busana muslim lokal terus menorehkan prestasi melalui pagelaran busana di Paris dan London, memperkuat posisi Indonesia sebagai pusat mode dunia.",
      content: generateContent("Desainer busana muslim lokal terus menorehkan prestasi melalui pagelaran busana di Paris dan London, memperkuat posisi Indonesia sebagai pusat mode dunia."),
      category: "Gaya Hidup",
      author: "Zaskia",
      date: "10 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsfashion/800/500",
      readTime: "4 menit",
    },
    {
      id: "26",
      title: "Robotika dalam Sekolah Dasar: Memperkenalkan Logika Digital sejak Dini",
      excerpt:
        "Kurikulum baru mulai memperkenalkan dasar-dasar pemrograman dan robotika sederhana bagi siswa sekolah dasar untuk menghadapi persaingan di era digital.",
      content: generateContent("Kurikulum baru mulai memperkenalkan dasar-dasar pemrograman dan robotika sederhana bagi siswa sekolah dasar untuk menghadapi persaingan di era digital."),
      category: "Teknologi",
      author: "Budi Utomo",
      date: "09 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsrobot/800/500",
      readTime: "6 menit",
    },
    {
      id: "27",
      title: "Misteri Peradaban Hilang di Pegunungan Jawa Barat Mulai Terungkap",
      excerpt:
        "Penelitian arkeologi terbaru menemukan situs kuno yang diduga berasal dari masa pra-kerajaan, memberikan titik terang sejarah awal pulau Jawa.",
      content: generateContent("Penelitian arkeologi terbaru menemukan situs kuno yang diduga berasal dari masa pra-kerajaan, memberikan titik terang sejarah awal pulau Jawa."),
      category: "Sains",
      author: "Ali Akbar",
      date: "08 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newshist/800/500",
      readTime: "8 menit",
    },
    {
      id: "28",
      title: "Digitalisasi Pasar Tradisional Mudahkan Transaksi Warga",
      excerpt:
        "Penerapan sistem pembayaran non-tunai di berbagai pasar tradisional telah meningkatkan keamanan dan kenyamanan belanja bagi pedagang maupun pembeli.",
      content: generateContent("Penerapan sistem pembayaran non-tunai di berbagai pasar tradisional telah meningkatkan keamanan dan kenyamanan belanja bagi pedagang maupun pembeli."),
      category: "Ekonomi",
      author: "Sari Indah",
      date: "07 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsmarketdig/800/500",
      readTime: "4 menit",
    },
    {
      id: "29",
      title: "Aksi Bersih Pantai Serentak di 100 Lokasi Seluruh Indonesia",
      excerpt:
        "Ribuan relawan berpartisipasi dalam gerakan nasional bersih pantai untuk menanggulangi sampah plastik yang mencemari lautan nusantara.",
      content: generateContent("Ribuan relawan berpartisipasi dalam gerakan nasional bersih pantai untuk menanggulangi sampah plastik yang mencemari lautan nusantara."),
      category: "Nasional",
      author: "Fajar Ramadhan",
      date: "06 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsclean/800/500",
      readTime: "3 menit",
    },
    {
      id: "30",
      title: "Vaksin Generasi Baru Lebih Ampuh Hadapi Mutasi Virus",
      excerpt:
        "Ilmuwan farmasi berhasil mengembangkan vaksin multi-strain yang memberikan perlindungan lebih luas terhadap berbagai varian virus yang bermutasi.",
      content: generateContent("Ilmuwan farmasi berhasil mengembangkan vaksin multi-strain yang memberikan perlindungan lebih luas terhadap berbagai varian virus yang bermutasi."),
      category: "Nasional",
      author: "Dr. Gunawan",
      date: "05 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsvac/800/500",
      readTime: "5 menit",
    },
    {
      id: "31",
      title: "Startup Finansial Lokal Raih Status Unicorn Baru",
      excerpt:
        "Perusahaan teknologi keuangan asal Indonesia resmi menyandang status unicorn setelah mendapatkan suntikan dana segar dari konsorsium investor global.",
      content: generateContent("Perusahaan teknologi keuangan asal Indonesia resmi menyandang status unicorn setelah mendapatkan suntikan dana segar dari konsorsium investor global."),
      category: "Ekonomi",
      author: "Kevin Sanjaya",
      date: "04 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newsfin/800/500",
      readTime: "4 menit",
    },
    {
      id: "32",
      title: "Pemanfaatan Energi Surya Skala Besar di Kawasan Industri",
      excerpt:
        "Pemasangan panel surya di atap pabrik-pabrik besar mulai diimplementasikan untuk mengurangi ketergantungan pada energi fosil dan menekan emisi gas rumah kaca.",
      content: generateContent("Pemasangan panel surya di atap pabrik-pabrik besar mulai diimplementasikan untuk mengurangi ketergantungan pada energi fosil dan menekan emisi gas rumah kaca."),
      category: "Sains",
      author: "Taufik Hidayat",
      date: "03 Feb 2026",
      imageUrl: "https://picsum.photos/seed/newssolar/800/500",
      readTime: "6 menit",
    },
  ];
}

export function getDummyNewsById(id: string): NewsArticle | undefined {
  return getDummyNews().find((article) => article.id === id);
}
