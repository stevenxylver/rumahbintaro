const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function main() {
    const properties = await db.property.findMany({
        select: { name: true, image: true }
    })
    console.log('DATA DATABASE VPS:')
    properties.forEach(p => {
        console.log(`- ${p.name}: [${p.image}]`)
    })
}

main().catch(console.error).finally(() => db.$disconnect())
