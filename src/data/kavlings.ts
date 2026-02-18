export interface Kavling {
    name: string
    slug: string
    kodeBlok: string
    cluster: string
    image: string
    size: string
    hot?: boolean
    description?: string
    images?: string[]
}

export const kavlings: Kavling[] = [
    {
        name: 'Sektor 1 - B1/B3-08',
        slug: 'sektor-1-b1-b3-08',
        kodeBlok: 'B1/B3-08',
        cluster: 'Sektor 1',
        image: '/images/areas/kaveling.png',
        size: '704 m²',
        hot: true,
        description: 'Tanah kavling luas di Sektor 1 Bintaro dengan luas 704 m². Lokasi strategis dan siap bangun.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Sektor 4 - B4/B6-03',
        slug: 'sektor-4-b4-b6-03',
        kodeBlok: 'B4/B6-03',
        cluster: 'Sektor 4',
        image: '/images/areas/kaveling.png',
        size: '243 m²',
        description: 'Kavling di Sektor 4 Bintaro dengan luas 243 m². Cocok untuk hunian keluarga.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Sektor 4 - B4/D6-05',
        slug: 'sektor-4-b4-d6-05',
        kodeBlok: 'B4/D6-05',
        cluster: 'Sektor 4',
        image: '/images/areas/kaveling.png',
        size: '465 m²',
        description: 'Kavling luas di Sektor 4 Bintaro dengan luas 465 m². Ideal untuk membangun rumah besar.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Cikini III - B7/FH2-23',
        slug: 'cikini-iii-b7-fh2-23',
        kodeBlok: 'B7/FH2-23',
        cluster: 'Cikini III',
        image: '/images/areas/kaveling.png',
        size: '928 m²',
        hot: true,
        description: 'Tanah kavling premium di Cikini III dengan luas 928 m². Lokasi eksklusif dan lingkungan tenang.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Graha Taman Bintaro - B9/HC5-14',
        slug: 'graha-taman-bintaro-b9-hc5-14',
        kodeBlok: 'B9/HC5-14',
        cluster: 'Graha Taman Bintaro',
        image: '/images/areas/kaveling.png',
        size: '1453 m²',
        hot: true,
        description: 'Kavling terluas di Graha Taman Bintaro dengan luas 1453 m². Sangat cocok untuk proyek residensial premium.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Taman Crista - B9/HE4-09',
        slug: 'taman-crista-b9-he4-09',
        kodeBlok: 'B9/HE4-09',
        cluster: 'Taman Crista',
        image: '/images/areas/kaveling.png',
        size: '202 m²',
        description: 'Kavling di Taman Crista dengan luas 202 m². Lingkungan asri dan nyaman.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Taman Permata - B9/HG26A-17',
        slug: 'taman-permata-b9-hg26a-17',
        kodeBlok: 'B9/HG26A-17',
        cluster: 'Taman Permata',
        image: '/images/areas/kaveling.png',
        size: '151 m²',
        description: 'Kavling compact di Taman Permata dengan luas 151 m². Ideal untuk rumah minimalis modern.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Vania Permata - B9/E1A-07',
        slug: 'vania-permata-b9-e1a-07',
        kodeBlok: 'B9/E1A-07',
        cluster: 'Vania Permata',
        image: '/images/areas/kaveling.png',
        size: '549 m²',
        hot: true,
        description: 'Kavling luas di Vania Permata dengan luas 549 m². Lokasi premium di kawasan Bintaro.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Vania Permata - B9/E1A-09',
        slug: 'vania-permata-b9-e1a-09',
        kodeBlok: 'B9/E1A-09',
        cluster: 'Vania Permata',
        image: '/images/areas/kaveling.png',
        size: '232 m²',
        description: 'Kavling di Vania Permata dengan luas 232 m². Cocok untuk hunian keluarga modern.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Vania Permata - B9/E1B-01',
        slug: 'vania-permata-b9-e1b-01',
        kodeBlok: 'B9/E1B-01',
        cluster: 'Vania Permata',
        image: '/images/areas/kaveling.png',
        size: '470 m²',
        description: 'Kavling strategis di Vania Permata dengan luas 470 m². Akses jalan lebar dan lingkungan asri.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Althia Park - AP/A7-23',
        slug: 'althia-park-ap-a7-23',
        kodeBlok: 'AP/A7-23',
        cluster: 'Althia Park',
        image: '/images/areas/kaveling.png',
        size: '361 m²',
        description: 'Kavling di Althia Park dengan luas 361 m². Kawasan modern dengan fasilitas lengkap.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Mahagoni Park - MP/B1-81',
        slug: 'mahagoni-park-mp-b1-81',
        kodeBlok: 'MP/B1-81',
        cluster: 'Mahagoni Park',
        image: '/images/areas/kaveling.png',
        size: '338 m²',
        description: 'Kavling di Mahagoni Park dengan luas 338 m². Lingkungan hijau dan tenang.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Mahagoni Park - MP/B21-52',
        slug: 'mahagoni-park-mp-b21-52',
        kodeBlok: 'MP/B21-52',
        cluster: 'Mahagoni Park',
        image: '/images/areas/kaveling.png',
        size: '340 m²',
        description: 'Kavling di Mahagoni Park dengan luas 340 m². Dekat fasilitas umum dan pusat perbelanjaan.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Mahagoni Park - MP/B22-06',
        slug: 'mahagoni-park-mp-b22-06',
        kodeBlok: 'MP/B22-06',
        cluster: 'Mahagoni Park',
        image: '/images/areas/kaveling.png',
        size: '235 m²',
        description: 'Kavling di Mahagoni Park dengan luas 235 m². Cocok untuk rumah keluarga.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Mahagoni Park - MP/B22-08',
        slug: 'mahagoni-park-mp-b22-08',
        kodeBlok: 'MP/B22-08',
        cluster: 'Mahagoni Park',
        image: '/images/areas/kaveling.png',
        size: '181 m²',
        description: 'Kavling compact di Mahagoni Park dengan luas 181 m². Ideal untuk hunian minimalis.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Mahagoni Park - MP/B7-37',
        slug: 'mahagoni-park-mp-b7-37',
        kodeBlok: 'MP/B7-37',
        cluster: 'Mahagoni Park',
        image: '/images/areas/kaveling.png',
        size: '474 m²',
        hot: true,
        description: 'Kavling terluas di Mahagoni Park dengan luas 474 m². Lokasi premium untuk hunian mewah.',
        images: ['/images/areas/kaveling.png']
    },
    {
        name: 'Puri Town House - PR/A-27',
        slug: 'puri-town-house-pr-a-27',
        kodeBlok: 'PR/A-27',
        cluster: 'Puri Town House',
        image: '/images/areas/kaveling.png',
        size: '484 m²',
        description: 'Kavling strategis di Puri Town House dengan luas 484 m². Kawasan eksklusif dan berkembang.',
        images: ['/images/areas/kaveling.png']
    },
]
