const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

// Fix image extension: .png, .jpg, .jpeg -> .webp
function fixExt(url) {
    if (!url) return url
    return url.replace(/\.(png|jpg|jpeg)$/i, '.webp')
}

// Fix JSON string of image array
function fixJsonImages(jsonStr) {
    if (!jsonStr) return jsonStr
    try {
        const arr = JSON.parse(jsonStr)
        if (Array.isArray(arr)) {
            return JSON.stringify(arr.map(fixExt))
        }
        return jsonStr
    } catch {
        return jsonStr
    }
}

async function main() {
    console.log('🔄 Fixing image paths in database...\n')

    // Fix Property
    const properties = await db.property.findMany()
    for (const p of properties) {
        const newImage = fixExt(p.image)
        const newImages = fixJsonImages(p.images)
        if (newImage !== p.image || newImages !== p.images) {
            await db.property.update({
                where: { id: p.id },
                data: { image: newImage, images: newImages }
            })
            console.log(`✅ Property "${p.name}": ${p.image} → ${newImage}`)
        }
    }

    // Fix PropertyType
    const types = await db.propertyType.findMany()
    for (const t of types) {
        const newImages = fixJsonImages(t.images)
        if (newImages !== t.images) {
            await db.propertyType.update({
                where: { id: t.id },
                data: { images: newImages }
            })
            console.log(`✅ PropertyType "${t.type}": images updated`)
        }
    }

    // Fix Kavling
    const kavlings = await db.kavling.findMany()
    for (const k of kavlings) {
        const newImage = fixExt(k.image)
        const newImages = fixJsonImages(k.images)
        if (newImage !== k.image || newImages !== k.images) {
            await db.kavling.update({
                where: { id: k.id },
                data: { image: newImage, images: newImages }
            })
            console.log(`✅ Kavling "${k.name}": ${k.image} → ${newImage}`)
        }
    }

    // Fix Facility
    const facilities = await db.facility.findMany()
    for (const f of facilities) {
        const newImage = fixExt(f.image)
        const newImages = fixJsonImages(f.images)
        if (newImage !== f.image || newImages !== f.images) {
            await db.facility.update({
                where: { id: f.id },
                data: { image: newImage, images: newImages }
            })
            console.log(`✅ Facility "${f.title}": ${f.image} → ${newImage}`)
        }
    }

    // Fix Promo
    const promos = await db.promo.findMany()
    for (const p of promos) {
        const newImage = fixExt(p.image)
        if (newImage !== p.image) {
            await db.promo.update({
                where: { id: p.id },
                data: { image: newImage }
            })
            console.log(`✅ Promo "${p.title}": ${p.image} → ${newImage}`)
        }
    }

    // Fix BlogPost
    const blogs = await db.blogPost.findMany()
    for (const b of blogs) {
        const newImage = fixExt(b.image)
        if (newImage !== b.image) {
            await db.blogPost.update({
                where: { id: b.id },
                data: { image: newImage }
            })
            console.log(`✅ Blog "${b.title}": ${b.image} → ${newImage}`)
        }
    }

    console.log('\n✅ Semua path gambar di database sudah diperbaiki ke .webp!')
}

main().catch(console.error).finally(() => db.$disconnect())
