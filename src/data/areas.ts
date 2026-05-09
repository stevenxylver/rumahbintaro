export interface Product {
    type: string  // Format: "Tipe LB/LT" (Luas Bangunan/Luas Tanah)
    bedrooms: number
    bathrooms: number
    kitchen: number
    livingRoom: number
    carPack: number
    terraceGarden: number
    ensuiteMasterBedroom?: number
    powderRoom?: number
    sideYard?: number
    guestLounge?: number
    laundryArea?: number
    diningRoom?: number
    maidRoomBathroom?: number
    workingArea?: number
    carCharger?: number
    smartDoorLock?: number
    wallPad?: number
    pantryArea?: number
    images: string[]  // Array of image paths
}

export interface Area {
    name: string
    slug: string
    image: string
    hot?: boolean
    virtualRoomUrl?: string
    brosurUrl?: string
    products: Product[]
    description?: string
    images?: string
}

export const areas: Area[] = [
    {
        name: 'Dharmawangsa',
        slug: 'dharmawangsa',
        image: '/images/products/dharmawangsa2.webp',
        hot: true,
        virtualRoomUrl: 'https://my.matterport.com/show/?m=EjSqZsjM5j3',
        brosurUrl: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_DHARMAWANGSA',
        products: [
            {
                type: 'Tipe 170/248',
                bedrooms: 2,
                bathrooms: 2,
                kitchen: 1,
                livingRoom: 1,
                carPack: 2,
                terraceGarden: 0,
                ensuiteMasterBedroom: 2,
                powderRoom: 0,
                sideYard: 3,
                guestLounge: 1,
                laundryArea: 1,
                diningRoom: 1,
                maidRoomBathroom: 1,
                workingArea: 1,
                carCharger: 1,
                smartDoorLock: 1,
                wallPad: 1,
                pantryArea: 2,
                images: ['/images/products/dharmawangsa.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
            {
                type: 'Tipe 170/280',
                bedrooms: 1,
                bathrooms: 1,
                kitchen: 1,
                livingRoom: 1,
                carPack: 3,
                terraceGarden: 0,
                ensuiteMasterBedroom: 2,
                powderRoom: 1,
                sideYard: 3,
                guestLounge: 1,
                laundryArea: 1,
                diningRoom: 1,
                maidRoomBathroom: 1,
                workingArea: 1,
                carCharger: 1,
                smartDoorLock: 1,
                wallPad: 1,
                pantryArea: 2,
                images: ['/images/products/dharmawangsa.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
            {
                type: 'Tipe 204/333',
                bedrooms: 1,
                bathrooms: 1,
                kitchen: 1,
                livingRoom: 1,
                carPack: 3,
                terraceGarden: 0,
                ensuiteMasterBedroom: 3,
                powderRoom: 1,
                sideYard: 3,
                guestLounge: 1,
                laundryArea: 1,
                diningRoom: 1,
                maidRoomBathroom: 1,
                workingArea: 1,
                carCharger: 1,
                smartDoorLock: 1,
                wallPad: 1,
                pantryArea: 2,
                images: ['/images/products/dharmawangsa.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
            {
                type: 'Tipe 204/294',
                bedrooms: 2,
                bathrooms: 1,
                kitchen: 1,
                livingRoom: 1,
                carPack: 3,
                terraceGarden: 0,
                ensuiteMasterBedroom: 2,
                powderRoom: 1,
                sideYard: 3,
                guestLounge: 1,
                laundryArea: 1,
                diningRoom: 1,
                maidRoomBathroom: 1,
                workingArea: 1,
                carCharger: 1,
                smartDoorLock: 1,
                wallPad: 1,
                pantryArea: 2,
                images: ['/images/products/dharmawangsa.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
        ],
        description: 'Cluster Dharmawangsa di Bintaro Jaya menawarkan hunian mewah dengan desain arsitektur modern yang elegan. Terletak di lokasi strategis dengan akses mudah menuju tol dan fasilitas premium.'
    },
    {
        name: 'Montana',
        slug: 'montana',
        image: '/images/products/montana2.webp',
        hot: true,
        virtualRoomUrl: 'https://my.matterport.com/show/?m=montana',
        products: [
            {
                type: 'Tipe 135/168',
                bedrooms: 6,
                bathrooms: 5,
                kitchen: 0,
                livingRoom: 0,
                carPack: 2,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/montanamain.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
            {
                type: 'Tipe 135/144',
                bedrooms: 5,
                bathrooms: 4,
                kitchen: 0,
                livingRoom: 0,
                carPack: 2,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/montanamain.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
        ],
        description: 'Nikmati hunian asri dan nyaman di Cluster Montana Bintaro Jaya. Cluster ini dirancang untuk gaya hidup modern keluarga millenial dengan keamanan 24 jam dan lingkungan hijau.'
    },
    {
        name: 'Azura',
        slug: 'azura',
        image: '/images/products/azzuramain.webp',
        virtualRoomUrl: 'https://my.matterport.com/show/?m=azura',
        products: [
            {
                type: 'Tipe 136/186',
                bedrooms: 5,
                bathrooms: 5,
                kitchen: 0,
                livingRoom: 0,
                carPack: 2,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/azzuramain.webp', '/images/products/azzuralivingroom.webp', '/images/products/azzurabedroom.webp', '/images/products/azzurabathroom.webp']
            },
            {
                type: 'Tipe 170/238',
                bedrooms: 5,
                bathrooms: 6,
                kitchen: 0,
                livingRoom: 0,
                carPack: 3,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/montanamain.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
        ],
        description: 'Azura Bintaro adalah perumahan eksklusif yang mengedepankan efisiensi ruang dan pencahayaan alami. Hunian ideal bagi Anda yang mencari keseimbangan hidup di tengah kota.'
    },
    {
        name: 'Botanica Aralia',
        slug: 'botanica-aralia',
        image: '/images/products/aralia.webp',
        products: [
            {
                type: 'Tipe 112/138',
                bedrooms: 5,
                bathrooms: 6,
                kitchen: 0,
                livingRoom: 0,
                carPack: 3,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/aralia.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
            {
                type: 'Tipe 128/156',
                bedrooms: 5,
                bathrooms: 6,
                kitchen: 0,
                livingRoom: 0,
                carPack: 3,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/montanamain.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
        ],
        description: 'Cluster Aralia di kawasan Botanica Bintaro Jaya mengusung konsep ramah lingkungan dengan taman-taman asri dan fungsionalitas ruang yang tinggi.'
    },
    {
        name: 'Botanica Belisa',
        slug: 'botanica-belisa',
        image: '/images/products/belisa.webp',
        hot: true,
        products: [
            {
                type: 'Tipe 96/121',
                bedrooms: 4,
                bathrooms: 4,
                kitchen: 0,
                livingRoom: 0,
                carPack: 2,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/belisa.webp', '/images/products/belisalivingroom.webp', '/images/products/belisaroom2.webp', '/images/products/dharmabathroom.webp']
            },
            {
                type: 'Tipe 112/149',
                bedrooms: 5,
                bathrooms: 5,
                kitchen: 0,
                livingRoom: 0,
                carPack: 2,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/montanamain.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
            {
                type: 'Tipe 128/173',
                bedrooms: 5,
                bathrooms: 5,
                kitchen: 0,
                livingRoom: 0,
                carPack: 2,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/montanamain.webp', '/images/products/dharmalivingroom.webp', '/images/products/dharmabedroom.webp', '/images/products/dharmabathroom.webp']
            },
        ],
        description: 'Cluster Belisa di Botanica adalah pilihan terbaik untuk investasi rumah mewah di Bintaro. Menggabungkan arsitektur kontemporer dengan fasilitas modern lengkap.'
    },
    {
        name: 'Riviera',
        slug: 'riviera',
        image: '/images/products/riviera.webp',
        products: [
            {
                type: 'Tipe 55/55',
                bedrooms: 2,
                bathrooms: 2,
                kitchen: 0,
                livingRoom: 0,
                carPack: 1,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/riviera.webp', '/images/products/livingroomrivia.webp', '/images/products/bedriviera.webp', '/images/products/dharmabathroom.webp']
            },
            {
                type: 'Tipe 60/59',
                bedrooms: 2,
                bathrooms: 2,
                kitchen: 0,
                livingRoom: 0,
                carPack: 1,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/riviera.webp', '/images/products/livingroomrivia.webp', '/images/products/bedriviera.webp', '/images/products/dharmabathroom.webp']
            },
            {
                type: 'Tipe 72/80',
                bedrooms: 3,
                bathrooms: 3,
                kitchen: 0,
                livingRoom: 0,
                carPack: 2,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/riviera.webp', '/images/products/livingroomrivia.webp', '/images/products/bedriviera.webp', '/images/products/dharmabathroom.webp']
            },
        ],
        description: 'Cluster Riviera menawarkan hunian minimalis modern yang sangat populer di Bintaro Jaya. Harga terjangkau dengan akses strategis ke stasiun dan pusat bisnis.'
    },
    {
        name: 'Ninehomes',
        slug: 'ninehomes',
        image: '/images/products/ninehome.webp',
        products: [
            {
                type: 'Tipe 72/80',
                bedrooms: 3,
                bathrooms: 3,
                kitchen: 0,
                livingRoom: 0,
                carPack: 2,
                terraceGarden: 0,
                ensuiteMasterBedroom: 0,
                powderRoom: 0,
                sideYard: 0,
                guestLounge: 0,
                laundryArea: 0,
                diningRoom: 0,
                maidRoomBathroom: 0,
                workingArea: 0,
                carCharger: 0,
                smartDoorLock: 0,
                wallPad: 0,
                pantryArea: 0,
                images: ['/images/products/ninehome.webp', '/images/products/livingroomrivia.webp', '/images/products/bedriviera.webp', '/images/products/dharmabathroom.webp']
            },
        ],
        description: 'Ninehomes adalah konsep hunian butik yang eksklusif dan tenang di jantung Bintaro. Memadukan privasi maksimal dengan kemudahan akses fasilitas kota.'
    },
    {
        name: 'Emerald Core',
        slug: 'emerald-core',
        image: '/images/products/emerald.webp',
        products: [
            {
                type: 'Tipe 72/62',
                bedrooms: 2,
                bathrooms: 1,
                kitchen: 1,
                livingRoom: 1,
                carPack: 1,
                terraceGarden: 0,
                images: ['/images/products/emerald-72-1.webp']
            },
            {
                type: 'Tipe 98/78',
                bedrooms: 3,
                bathrooms: 2,
                kitchen: 1,
                livingRoom: 1,
                carPack: 2,
                terraceGarden: 1,
                images: ['/images/products/emerald-98-1.webp', '/images/products/emerald-98-2.webp']
            },
        ],
        description: 'Emerald Core menghadirkan desain rumah yang kompak namun fungsional di salah satu kawasan paling premium di Bintaro Jaya.'
    },
    {
        name: 'Botanica Evenue',
        slug: 'botanica-evenue',
        image: '/images/areas/Bintarojaya.webp',
        products: [
            {
                type: 'Tipe 76/66',
                bedrooms: 2,
                bathrooms: 1,
                kitchen: 1,
                livingRoom: 1,
                carPack: 1,
                terraceGarden: 0,
                images: ['/images/products/evenue-76-1.webp']
            },
            {
                type: 'Tipe 102/82',
                bedrooms: 3,
                bathrooms: 2,
                kitchen: 1,
                livingRoom: 1,
                carPack: 2,
                terraceGarden: 1,
                images: ['/images/products/evenue-102-1.webp', '/images/products/evenue-102-2.webp']
            },
            {
                type: 'Tipe 125/95',
                bedrooms: 4,
                bathrooms: 3,
                kitchen: 1,
                livingRoom: 2,
                carPack: 2,
                terraceGarden: 1,
                images: ['/images/products/evenue-125-1.webp']
            },
        ],
        description: 'Botanica Evenue adalah pilihan tepat bagi keluarga muda yang mendambakan rumah dengan lingkungan hijau yang terintegrasi dengan baik.'
    },
    {
        name: 'Botanica Arcade',
        slug: 'botanica-arcade',
        image: '/images/areas/Bintarojaya.webp',
        products: [
            {
                type: 'Tipe 70/60',
                bedrooms: 2,
                bathrooms: 1,
                kitchen: 1,
                livingRoom: 1,
                carPack: 1,
                terraceGarden: 0,
                images: ['/images/products/arcade-70-1.webp']
            },
            {
                type: 'Tipe 92/74',
                bedrooms: 3,
                bathrooms: 2,
                kitchen: 1,
                livingRoom: 1,
                carPack: 2,
                terraceGarden: 1,
                images: ['/images/products/arcade-92-1.webp', '/images/products/arcade-92-2.webp']
            },
        ],
        description: 'Cluster Arcade di Botanica menawarkan kemudahan akses ke berbagai pusat kuliner dan belanja di kawasan komersial Bintaro Jaya.'
    },
];
