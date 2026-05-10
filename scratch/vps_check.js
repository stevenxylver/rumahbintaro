const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function main() {
    const promos = await db.promo.findMany()
    console.log('--- PROMO TABLE DATA ---')
    promos.forEach(p => {
        console.log(`ID: ${p.id} | Image: [${p.image}]`)
    })
}

main().catch(console.error).finally(() => db.$disconnect())
