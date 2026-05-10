const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function main() {
    // Check property images
    const properties = await db.property.findMany({
        select: { slug: true, image: true, images: true },
        take: 3
    })
    console.log('=== PROPERTIES ===')
    console.log(JSON.stringify(properties, null, 2))

    // Check product images
    const products = await db.product.findMany({
        select: { type: true, images: true, propertyId: true },
        take: 5
    })
    console.log('\n=== PRODUCTS ===')
    console.log(JSON.stringify(products, null, 2))
}

main().catch(console.error).finally(() => db.$disconnect())
