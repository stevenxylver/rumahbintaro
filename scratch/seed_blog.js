const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

const articles = [
    {
        slug: 'panduan-kpr-rumah-bintaro-2026',
        title: 'Panduan Lengkap KPR Rumah di Bintaro Jaya 2026: Syarat, Proses, dan Tips Disetujui',
        date: new Date('2026-05-01'),
        image: '/images/products/dharmawangsa2.webp',
        excerpt: 'Ingin membeli rumah di Bintaro lewat KPR? Simak panduan lengkap mulai dari syarat pengajuan, proses approval, hingga tips agar KPR Anda langsung disetujui bank.',
        content: `
            <p>Membeli rumah melalui Kredit Pemilikan Rumah (KPR) adalah langkah finansial besar yang memerlukan persiapan matang. Di Bintaro Jaya, banyak bank partner resmi yang siap membantu Anda mewujudkan hunian impian dengan cicilan ringan.</p>
            <h3>Syarat Umum Pengajuan KPR</h3>
            <p>Secara umum, bank mensyaratkan usia minimal 21 tahun, memiliki penghasilan tetap minimal 2 tahun, dan rasio cicilan tidak melebihi 30% dari gaji bulanan. Dokumen yang perlu disiapkan antara lain KTP, KK, NPWP, slip gaji 3 bulan terakhir, dan rekening koran.</p>
            <h3>Proses Pengajuan KPR</h3>
            <p>Proses dimulai dari pemilihan unit rumah, pengajuan ke bank, proses appraisal, hingga penandatanganan akad kredit. Di Bintaro Jaya, proses ini dipermudah dengan layanan <strong>Instan Approval</strong> yang memungkinkan Anda mendapat keputusan kredit dalam waktu singkat.</p>
            <h3>Tips Agar KPR Disetujui</h3>
            <p>Pastikan track record BI Checking Anda bersih, siapkan DP minimal 10-20%, dan ajukan KPR sesuai kemampuan bayar. Konsultasikan dengan marketing kami untuk mendapatkan simulasi cicilan yang sesuai budget Anda.</p>
        `
    },
    {
        slug: 'cluster-dharmawangsa-hunian-mewah-bintaro',
        title: 'Cluster Dharmawangsa: Hunian Mewah dengan Smart Home System di Bintaro Jaya',
        date: new Date('2026-04-28'),
        image: '/images/products/dharmawangsa.webp',
        excerpt: 'Kenali lebih dalam Cluster Dharmawangsa yang menawarkan hunian premium dengan teknologi smart home, desain modern, dan fasilitas eksklusif di jantung Bintaro.',
        content: `
            <p>Cluster Dharmawangsa merupakan salah satu produk unggulan Bintaro Jaya yang dirancang untuk memenuhi kebutuhan gaya hidup modern. Dengan arsitektur kontemporer dan sentuhan teknologi terkini, cluster ini menjadi pilihan utama keluarga urban.</p>
            <h3>Desain Arsitektur Modern</h3>
            <p>Setiap unit di Cluster Dharmawangsa didesain dengan konsep open-plan living yang memaksimalkan pencahayaan alami dan sirkulasi udara. Material premium seperti granite tile dan aluminium composite panel digunakan pada eksterior untuk kesan mewah yang tahan lama.</p>
            <h3>Smart Home Technology</h3>
            <p>Dilengkapi dengan smart door lock, wall pad intercom, dan EV charging installation, Dharmawangsa siap menjawab kebutuhan penghuni masa kini yang mengedepankan kenyamanan dan keamanan.</p>
            <h3>Fasilitas Eksklusif</h3>
            <p>Penghuni Dharmawangsa menikmati akses ke taman hijau, jogging track, dan club house. Keamanan 24 jam dengan CCTV memberikan ketenangan bagi seluruh keluarga.</p>
        `
    },
    {
        slug: 'perbandingan-cluster-bintaro-jaya-2026',
        title: 'Perbandingan 6 Cluster Terbaik di Bintaro Jaya: Mana yang Cocok untuk Anda?',
        date: new Date('2026-04-25'),
        image: '/images/products/montanamain.webp',
        excerpt: 'Bingung memilih cluster di Bintaro? Kami bandingkan Dharmawangsa, Montana, Azura, Aralia, Belisa, dan Riviera dari segi harga, fasilitas, dan lokasi.',
        content: `
            <p>Bintaro Jaya menawarkan beragam cluster dengan karakter dan keunggulan masing-masing. Memilih yang tepat bergantung pada kebutuhan, budget, dan gaya hidup Anda.</p>
            <h3>Dharmawangsa vs Montana</h3>
            <p>Dharmawangsa menawarkan kemewahan dengan smart home system, cocok untuk eksekutif muda. Montana lebih fokus pada ruang yang luas dengan 6 kamar tidur, ideal untuk keluarga besar.</p>
            <h3>Azura vs Aralia</h3>
            <p>Azura mengedepankan efisiensi ruang dan pencahayaan alami, sementara Aralia di kawasan Botanica menawarkan konsep ramah lingkungan dengan taman asri.</p>
            <h3>Belisa vs Riviera</h3>
            <p>Belisa adalah pilihan premium di Botanica dengan harga yang lebih terjangkau. Riviera cocok bagi first-time buyer dengan tipe mulai dari 55/55 dan cicilan ringan mulai 6 juta/bulan.</p>
        `
    },
    {
        slug: 'keunggulan-lokasi-strategis-bintaro',
        title: 'Mengapa Lokasi Bintaro Jaya Sangat Strategis untuk Hunian dan Investasi?',
        date: new Date('2026-04-20'),
        image: '/images/areas/bintarojaya.webp',
        excerpt: 'Dari akses tol hingga stasiun KRL, Bintaro Jaya memiliki konektivitas luar biasa. Simak analisis lengkap keunggulan lokasi Bintaro sebagai kawasan hunian premium.',
        content: `
            <p>Lokasi adalah faktor nomor satu dalam memilih properti. Bintaro Jaya menawarkan konektivitas dan aksesibilitas yang sulit ditandingi kawasan lain di Tangerang Selatan.</p>
            <h3>Akses Transportasi</h3>
            <p>Terletak dekat dengan Tol JORR, Tol Pondok Ranji, dan Tol Parigi, Bintaro menjadi hub transportasi yang menghubungkan ke BSD, Pondok Indah, dan Jakarta Selatan. Stasiun KRL Jurangmangu dan Pondok Ranji juga mudah dijangkau.</p>
            <h3>Fasilitas Pendidikan</h3>
            <p>Bintaro dikelilingi oleh institusi pendidikan berkualitas seperti BINUS, Lab School, SD Al-Azhar, dan SMP BPK Penabur. Ideal untuk keluarga dengan anak usia sekolah.</p>
            <h3>Pusat Kesehatan</h3>
            <p>RS Pondok Indah Bintaro Jaya, RS Premier, dan berbagai klinik modern memastikan akses kesehatan premium bagi seluruh penghuni.</p>
        `
    },
    {
        slug: 'tips-desain-interior-rumah-modern-bintaro',
        title: '7 Inspirasi Desain Interior Rumah Modern ala Cluster Bintaro Jaya',
        date: new Date('2026-04-18'),
        image: '/images/products/dharmalivingroom.webp',
        excerpt: 'Dapatkan inspirasi desain interior dari rumah-rumah terbaru di Bintaro Jaya. Dari living room minimalis hingga kamar tidur mewah yang bisa Anda tiru.',
        content: `
            <p>Rumah-rumah di Bintaro Jaya dikenal dengan desain interior yang modern dan fungsional. Berikut 7 inspirasi yang bisa Anda aplikasikan di hunian Anda.</p>
            <h3>1. Open-Plan Living Room</h3>
            <p>Menggabungkan ruang tamu, ruang makan, dan dapur dalam satu area terbuka menciptakan kesan luas dan modern. Gunakan partisi kaca atau rak terbuka sebagai pemisah visual.</p>
            <h3>2. Kamar Tidur dengan Ensuite Bathroom</h3>
            <p>Tren kamar tidur utama dengan kamar mandi dalam (ensuite) semakin populer. Tambahkan rain shower dan bathtub untuk sentuhan spa-like experience.</p>
            <h3>3. Pantry Area yang Fungsional</h3>
            <p>Pisahkan wet kitchen dan dry kitchen untuk menjaga kebersihan area masak. Gunakan kitchen set dengan material HPL atau lacquer untuk tampilan premium.</p>
            <h3>4. Working Area di Rumah</h3>
            <p>Dengan tren work from home, area kerja di rumah menjadi kebutuhan penting. Cluster Dharmawangsa sudah menyediakan dedicated working area di setiap unit.</p>
        `
    },
    {
        slug: 'investasi-properti-bintaro-jaya-potensi-kenaikan',
        title: 'Analisis Potensi Kenaikan Harga Properti di Bintaro Jaya 5 Tahun ke Depan',
        date: new Date('2026-04-15'),
        image: '/images/products/montana2.webp',
        excerpt: 'Data menunjukkan harga properti di Bintaro naik rata-rata 15-20% per tahun. Pelajari faktor-faktor yang mendorong kenaikan ini dan peluang investasi terbaiknya.',
        content: `
            <p>Bintaro Jaya telah membuktikan diri sebagai salah satu kawasan properti paling stabil dan menguntungkan di Jabodetabek. Data historis menunjukkan tren kenaikan harga yang konsisten.</p>
            <h3>Faktor Pendorong Kenaikan Harga</h3>
            <p>Beberapa faktor utama yang mendorong kenaikan harga properti di Bintaro meliputi: pembangunan infrastruktur baru (tol, MRT, LRT), pengembangan kawasan komersial, dan peningkatan demand dari segmen millennial.</p>
            <h3>Perbandingan ROI</h3>
            <p>Investasi properti di Bintaro memberikan return on investment (ROI) yang lebih tinggi dibandingkan deposito bank. Harga tanah kavling bahkan bisa naik hingga 25% per tahun di lokasi-lokasi premium.</p>
            <h3>Kapan Waktu Terbaik Membeli?</h3>
            <p>Dengan adanya promo Free DP, Free PPN, dan cicilan mulai 6 juta/bulan, saat ini merupakan momentum terbaik untuk berinvestasi di Bintaro Jaya sebelum harga naik lebih tinggi.</p>
        `
    },
    {
        slug: 'fasilitas-lengkap-kawasan-bintaro-jaya',
        title: 'Fasilitas Lengkap Kawasan Bintaro Jaya: Mall, Sekolah, RS, hingga Taman',
        date: new Date('2026-04-12'),
        image: '/images/areas/lottemart.webp',
        excerpt: 'Bintaro Jaya bukan sekadar perumahan. Dengan mall, sekolah internasional, rumah sakit, dan taman, kawasan ini menawarkan ekosistem hidup yang lengkap.',
        content: `
            <p>Salah satu keunggulan utama Bintaro Jaya adalah kelengkapan fasilitasnya. Kawasan ini dirancang sebagai self-contained city yang memenuhi semua kebutuhan penghuni.</p>
            <h3>Pusat Perbelanjaan</h3>
            <p>Bintaro Jaya Xchange Mall, Bintaro Trade Center, dan Lotte Mart menyediakan kebutuhan belanja harian hingga gaya hidup. Deretan kuliner dan café juga tersebar di sepanjang kawasan.</p>
            <h3>Fasilitas Pendidikan</h3>
            <p>Dari tingkat TK hingga universitas, Bintaro memiliki semuanya: SD Al-Azhar, Lab School, BPK Penabur, hingga kampus BINUS. Kualitas pendidikan di sini setara dengan kawasan premium Jakarta.</p>
            <h3>Kesehatan dan Rekreasi</h3>
            <p>RS Pondok Indah Bintaro, Kimia Farma, dan berbagai klinik modern menjamin layanan kesehatan 24 jam. Untuk rekreasi, taman-taman hijau dan jogging track tersebar di setiap cluster.</p>
        `
    },
    {
        slug: 'promo-rumah-bintaro-free-ppn-dp',
        title: 'Promo Rumah Bintaro 2026: Free PPN, Free DP, dan Cicilan Mulai 6 Juta/Bulan',
        date: new Date('2026-04-08'),
        image: '/images/products/belisa.webp',
        excerpt: 'Jangan lewatkan promo eksklusif rumah di Bintaro Jaya! Free PPN DTP 100%, Free DP, free AC, free CCTV, dan cicilan super ringan mulai 6 juta per bulan.',
        content: `
            <p>Bintaro Jaya kembali menghadirkan promo spektakuler untuk Anda yang bermimpi memiliki rumah di kawasan premium. Promo ini berlaku untuk semua cluster yang tersedia.</p>
            <h3>Detail Promo</h3>
            <p>Berikut benefit yang bisa Anda dapatkan:</p>
            <ul>
                <li>Free PPN DTP 100% — hemat ratusan juta rupiah</li>
                <li>Free DP — langsung huni tanpa uang muka</li>
                <li>Free AC di setiap kamar</li>
                <li>Free CCTV untuk keamanan keluarga</li>
                <li>Free Kitchen Set premium</li>
                <li>Free Solar Panel untuk hemat listrik</li>
                <li>Free Smart Door Lock & Smarthome System</li>
                <li>Free Water Heater</li>
                <li>Free EV Charging Installation</li>
            </ul>
            <h3>Cicilan Super Ringan</h3>
            <p>Dengan cicilan mulai dari 6 juta/bulan, memiliki rumah di Bintaro Jaya kini semakin terjangkau. Hubungi kami segera untuk mendapatkan simulasi cicilan yang sesuai!</p>
        `
    },
    {
        slug: 'keamanan-cluster-bintaro-jaya-24-jam',
        title: 'Sistem Keamanan 24 Jam di Cluster Bintaro Jaya: CCTV, Smart Lock, dan One Gate',
        date: new Date('2026-04-05'),
        image: '/images/products/azzuramain.webp',
        excerpt: 'Keamanan adalah prioritas utama di Bintaro Jaya. Pelajari sistem keamanan berlapis mulai dari one gate system, CCTV, hingga smart door lock di setiap unit.',
        content: `
            <p>Keamanan keluarga adalah hal yang tidak bisa dikompromikan. Di Bintaro Jaya, setiap cluster dilengkapi dengan sistem keamanan berlapis yang memberikan ketenangan maksimal.</p>
            <h3>One Gate System</h3>
            <p>Setiap cluster menerapkan sistem satu pintu masuk (one gate system) yang dijaga oleh petugas keamanan 24 jam. Tamu yang masuk wajib melakukan registrasi untuk memastikan keamanan seluruh penghuni.</p>
            <h3>CCTV di Setiap Sudut</h3>
            <p>Kamera CCTV dipasang di titik-titik strategis termasuk gerbang masuk, jalan cluster, dan area publik. Rekaman tersimpan dan bisa diakses kapan saja jika diperlukan.</p>
            <h3>Smart Door Lock</h3>
            <p>Unit-unit terbaru di cluster Dharmawangsa dan Azura dilengkapi smart door lock yang bisa dibuka dengan fingerprint, PIN, atau kartu. Tidak perlu khawatir lupa bawa kunci lagi!</p>
        `
    },
    {
        slug: 'gaya-hidup-hijau-sustainable-living-bintaro',
        title: 'Sustainable Living di Bintaro Jaya: Solar Panel, EV Charger, dan Taman Hijau',
        date: new Date('2026-04-01'),
        image: '/images/products/aralia.webp',
        excerpt: 'Bintaro Jaya berkomitmen pada gaya hidup berkelanjutan dengan solar panel gratis, EV charging station, dan area hijau yang luas di setiap cluster.',
        content: `
            <p>Di tengah semakin meningkatnya kesadaran akan lingkungan, Bintaro Jaya mengambil langkah konkret dengan mengintegrasikan fitur-fitur ramah lingkungan ke dalam setiap pengembangan propertinya.</p>
            <h3>Solar Panel Gratis</h3>
            <p>Setiap unit baru di Bintaro Jaya dilengkapi dengan solar panel gratis. Ini bukan hanya mengurangi jejak karbon, tapi juga menghemat tagihan listrik hingga 30% setiap bulannya.</p>
            <h3>EV Charging Installation</h3>
            <p>Mengantisipasi era kendaraan listrik, Bintaro Jaya menyediakan EV charging point di rumah-rumah baru. Pemilik mobil listrik bisa mengisi daya dengan nyaman di garasi sendiri.</p>
            <h3>Ruang Terbuka Hijau</h3>
            <p>Lebih dari 30% area Bintaro Jaya dialokasikan untuk ruang terbuka hijau. Taman-taman, jogging track, dan area bermain anak tersebar di setiap cluster untuk mendukung gaya hidup sehat dan aktif.</p>
        `
    }
]

async function main() {
    console.log('🔄 Menambahkan 10 artikel blog ke database...\n')

    for (const article of articles) {
        // Check if slug already exists
        const existing = await db.blogPost.findUnique({ where: { slug: article.slug } })
        if (existing) {
            console.log(`⏭️  Sudah ada: ${article.title}`)
            continue
        }

        await db.blogPost.create({ data: article })
        console.log(`✅ Ditambahkan: ${article.title}`)
    }

    console.log('\n✅ Selesai! Total artikel di database:', await db.blogPost.count())
}

main()
    .catch(console.error)
    .finally(() => db.$disconnect())
