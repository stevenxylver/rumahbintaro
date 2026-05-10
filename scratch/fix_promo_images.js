const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')
const db = new PrismaClient()

async function main() {
    console.log('🔄 Memperbaiki path gambar Promo...')
    const publicPath = '/home/Steven1/rumahbintaro/public'
    
    const promos = await db.promo.findMany()
    for (const p of promos) {
        const currentPath = p.image
        const fullPath = path.join(publicPath, currentPath)
        
        // Jika file tidak ditemukan, coba ganti ekstensi
        if (!fs.existsSync(fullPath)) {
            let newPath = currentPath
            if (currentPath.endsWith('.webp')) {
                const pngPath = currentPath.replace('.webp', '.png')
                const jpgPath = currentPath.replace('.webp', '.jpg')
                
                if (fs.existsSync(path.join(publicPath, pngPath))) newPath = pngPath
                else if (fs.existsSync(path.join(publicPath, jpgPath))) newPath = jpgPath
            } else if (currentPath.endsWith('.png') || currentPath.endsWith('.jpg')) {
                const webpPath = currentPath.replace(/\.(png|jpg)$/, '.webp')
                if (fs.existsSync(path.join(publicPath, webpPath))) newPath = webpPath
            }
            
            if (newPath !== currentPath) {
                await db.promo.update({
                    where: { id: p.id },
                    data: { image: newPath }
                })
                console.log(`✅ Promo Fixed: ${currentPath} -> ${newPath}`)
            } else {
                console.log(`⚠️ File tetap tidak ditemukan untuk: ${currentPath}`)
            }
        } else {
            console.log(`ok: ${currentPath} sudah benar.`)
        }
    }
}

main().catch(console.error).finally(() => db.$disconnect())
