const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function main() {
    console.log('🔄 Memulihkan data gambar Properti...')

    const mappings = {
        "Dharmawangsa": "/images/products/dharmawangsa.webp",
        "Montana": "/images/products/montana.webp",
        "Azura": "/images/products/azzuramain.webp",
        "Botanica Aralia": "/images/products/aralia.webp",
        "Botanica Belisa": "/images/products/belisa.webp",
        "Riviera": "/images/products/riviera.webp",
        "Ninehomes": "/images/products/ninehome.webp",
        "Emerald Core": "/images/products/emerald.webp",
        "Nine home": "/images/products/ninehome.webp"
    }

    const properties = await db.property.findMany()
    for (const p of properties) {
        const targetPath = mappings[p.name]
        if (targetPath) {
            await db.property.update({
                where: { id: p.id },
                data: { image: targetPath }
            })
            console.log(`✅ Fixed ${p.name} -> ${targetPath}`)
        }
    }

    console.log('🔄 Memulihkan data gambar Unit/Product...')
    const types = await db.propertyType.findMany({ include: { property: true } })
    for (const t of types) {
        let gallery = []
        const name = t.property.name.toLowerCase()
        
        if (name.includes('dharma')) gallery = ["/images/products/dharmawangsa.webp", "/images/products/dharmalivingroom.webp", "/images/products/dharmabedroom.webp"]
        else if (name.includes('montana')) gallery = ["/images/products/montanamain.webp", "/images/products/montana2.webp"]
        else if (name.includes('azura')) gallery = ["/images/products/azzuramain.webp", "/images/products/azzuralivingroom.webp", "/images/products/azzurabedroom.webp"]
        else if (name.includes('riviera')) gallery = ["/images/products/riviera.webp", "/images/products/livingroomrivia.webp", "/images/products/bedriviera.webp"]
        else if (name.includes('belisa')) gallery = ["/images/products/belisa.webp", "/images/products/belisalivingroom.webp", "/images/products/belisaroom2.webp"]
        else if (name.includes('nine')) gallery = ["/images/products/ninehome.webp"]
        else if (name.includes('emerald')) gallery = ["/images/products/emerald.webp"]
        else if (name.includes('aralia')) gallery = ["/images/products/aralia.webp"]

        if (gallery.length > 0) {
            await db.propertyType.update({
                where: { id: t.id },
                data: { images: JSON.stringify(gallery) }
            })
            console.log(`✅ Fixed Unit ${t.type} for ${t.property.name}`)
        }
    }

    console.log('\n✅ Perbaikan selesai! Silakan refresh halaman.')
}

main().catch(console.error).finally(() => db.$disconnect())
