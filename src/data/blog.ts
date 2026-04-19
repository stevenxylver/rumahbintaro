export interface BlogPost {
    slug: string
    title: string
    date: string
    image: string
    excerpt: string
    content: string
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'tips-memilih-rumah-di-bintaro',
        title: '5 Tips Jitu Memilih Rumah Impian di Kawasan Bintaro',
        date: '2026-04-10',
        image: '/images/areas/kebayoran-village.png',
        excerpt: 'Sedang mencari hunian di Bintaro? Simak 5 tips penting sebelum Anda memutuskan membeli rumah di kawasan premium ini.',
        content: `
            <p>Memilih rumah di kawasan yang sedang berkembang pesat seperti Bintaro Jaya memerlukan ketelitian ekstra. Tidak hanya soal harga, tapi juga aksesibilitas dan fasilitas pendukung lainnya.</p>
            <h3>1. Lokasi yang Strategis</h3>
            <p>Pastikan lokasi hunian dekat dengan pintu tol (seperti Tol Pondok Ranji atau Parigi) dan stasiun KRL. Akses transportasi yang mudah adalah kunci kenyamanan tinggal di Bintaro.</p>
            <h3>2. Fasilitas Sekolah dan Kesehatan</h3>
            <p>Bintaro dikenal dengan fasilitas pendidikan kelas dunia dan rumah sakit berkualitas seperti RS Pondok Indah Bintaro. Pilihlah hunian yang memudahkan akses ke fasilitas-fasilitas ini.</p>
            <p>Eksplorasi lebih lanjut mengenai pilihan hunian terbaik hanya di website kami.</p>
        `
    },
    {
        slug: 'keuntungan-investasi-kavling',
        title: 'Mengapa Investasi Kavling di Bintaro Sangat Menguntungkan?',
        date: '2026-04-15',
        image: '/images/areas/menteng-bintaro.png',
        excerpt: 'Ketahui alasan mengapa harga tanah kavling di Bintaro terus naik dan menjadi primadona investasi bagi para pakar properti.',
        content: `
            <p>Investasi tanah atau kavling seringkali memberikan return yang lebih tinggi dibandingkan bangunan. Di Bintaro Jaya, permintaan lahan terus meningkat seiring dengan pengembangan infrastruktur baru.</p>
            <h3>Kenaikan Harga yang Konsisten</h3>
            <p>Berdasarkan tren 5 tahun terakhir, harga properti di Bintaro menunjukkan kurva kenaikan yang stabil. Hal ini menjamin aset Anda tetap bernilai tinggi di masa depan.</p>
            <p>Ketersediaan lahan yang semakin terbatas menjadikan setiap kavling yang tersedia sebagai investasi emas.</p>
        `
    }
]
