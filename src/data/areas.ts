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
    products: Product[]
}

export const areas: Area[] = [
    {
        name: 'Dharmawangsa',
        slug: 'dharmawangsa',
        image: '/images/products/dharmawangsa2.png',
        hot: true,
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
                images: ['/images/products/dharmawangsa.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
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
                images: ['/images/products/dharmawangsa.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
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
                images: ['/images/products/dharmawangsa.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
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
                images: ['/images/products/dharmawangsa.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
            },
        ]
    },
    {
        name: 'Montana',
        slug: 'montana',
        image: '/images/products/montana2.png',
        hot: true,
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
                images: ['/images/products/montanamain.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
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
                images: ['/images/products/montanamain.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
            },
        ]
    },
    {
        name: 'Azura',
        slug: 'azura',
        image: '/images/products/azzuramain.png',
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
                images: ['/images/products/azzuramain.png', '/images/products/azzuralivingroom.png', '/images/products/azzurabedroom.png', '/images/products/azzurabathroom.png']
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
                images: ['/images/products/montanamain.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
            },
        ]
    },
    {
        name: 'Botanica Aralia',
        slug: 'botanica-aralia',
        image: '/images/products/aralia.png',
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
                images: ['/images/products/aralia.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
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
                images: ['/images/products/montanamain.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
            },
        ]
    },
    {
        name: 'Botanica Belisa',
        slug: 'botanica-belisa',
        image: '/images/products/belisa.png',
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
                images: ['/images/products/belisa.png', '/images/products/belisalivingroom.png', '/images/products/belisaroom2.png', '/images/products/dharmabathroom.png']
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
                images: ['/images/products/montanamain.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
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
                images: ['/images/products/montanamain.png', '/images/products/dharmalivingroom.png', '/images/products/dharmabedroom.png', '/images/products/dharmabathroom.png']
            },
        ]
    },
    {
        name: 'Riviera',
        slug: 'riviera',
        image: '/images/products/riviera.png',
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
                images: ['/images/products/riviera.png', '/images/products/livingroomrivia.png', '/images/products/bedriviera.png', '/images/products/dharmabathroom.png']
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
                images: ['/images/products/riviera.png', '/images/products/livingroomrivia.png', '/images/products/bedriviera.png', '/images/products/dharmabathroom.png']
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
                images: ['/images/products/riviera.png', '/images/products/livingroomrivia.png', '/images/products/bedriviera.png', '/images/products/dharmabathroom.png']
            },
        ]
    },
    {
        name: 'Ninehomes',
        slug: 'ninehomes',
        image: '/images/products/ninehome.png',
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
                images: ['/images/products/ninehome.png', '/images/products/livingroomrivia.png', '/images/products/bedriviera.png', '/images/products/dharmabathroom.png']
            },
        ]
    },
    {
        name: 'Emerald Core',
        slug: 'emerald-core',
        image: '/images/products/emerald.png',
        products: [
            {
                type: 'Tipe 72/62',
                bedrooms: 2,
                bathrooms: 1,
                kitchen: 1,
                livingRoom: 1,
                carPack: 1,
                terraceGarden: 0,
                images: ['/images/products/emerald-72-1.jpg']
            },
            {
                type: 'Tipe 98/78',
                bedrooms: 3,
                bathrooms: 2,
                kitchen: 1,
                livingRoom: 1,
                carPack: 2,
                terraceGarden: 1,
                images: ['/images/products/emerald-98-1.jpg', '/images/products/emerald-98-2.jpg']
            },
        ]
    },
    {
        name: 'Botanica Evenue',
        slug: 'botanica-evenue',
        image: '/images/areas/Bintarojaya.png',
        products: [
            {
                type: 'Tipe 76/66',
                bedrooms: 2,
                bathrooms: 1,
                kitchen: 1,
                livingRoom: 1,
                carPack: 1,
                terraceGarden: 0,
                images: ['/images/products/evenue-76-1.jpg']
            },
            {
                type: 'Tipe 102/82',
                bedrooms: 3,
                bathrooms: 2,
                kitchen: 1,
                livingRoom: 1,
                carPack: 2,
                terraceGarden: 1,
                images: ['/images/products/evenue-102-1.jpg', '/images/products/evenue-102-2.jpg']
            },
            {
                type: 'Tipe 125/95',
                bedrooms: 4,
                bathrooms: 3,
                kitchen: 1,
                livingRoom: 2,
                carPack: 2,
                terraceGarden: 1,
                images: ['/images/products/evenue-125-1.jpg']
            },
        ]
    },
    {
        name: 'Botanica Arcade',
        slug: 'botanica-arcade',
        image: '/images/areas/Bintarojaya.png',
        products: [
            {
                type: 'Tipe 70/60',
                bedrooms: 2,
                bathrooms: 1,
                kitchen: 1,
                livingRoom: 1,
                carPack: 1,
                terraceGarden: 0,
                images: ['/images/products/arcade-70-1.jpg']
            },
            {
                type: 'Tipe 92/74',
                bedrooms: 3,
                bathrooms: 2,
                kitchen: 1,
                livingRoom: 1,
                carPack: 2,
                terraceGarden: 1,
                images: ['/images/products/arcade-92-1.jpg', '/images/products/arcade-92-2.jpg']
            },
        ]
    },
]
