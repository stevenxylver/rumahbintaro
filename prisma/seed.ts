import { PrismaClient } from '@prisma/client'
import { blogPosts } from '../src/data/blog'
import { kavlings } from '../src/data/kavlings'

const prisma = new PrismaClient()

const facilities = [
  // Kesehatan
  { title: 'RS Pondok Indah', image: '/images/areas/rumahsakitpi.png', category: 'kesehatan' },
  { title: 'Klinik Medika', image: '/images/areas/klinikmedika.png', category: 'kesehatan' },
  { title: 'Apotek Kimia Farma', image: '/images/areas/kimiafarma.png', category: 'kesehatan' },
  // Edukasi
  { title: 'SD Al-Azhar', image: '/images/areas/sdaladzhar.png', category: 'edukasi' },
  { title: 'SMPK Penabur', image: '/images/areas/smpkpenabur.png', category: 'edukasi' },
  { title: 'SMA Labschool', image: '/images/areas/labschool.png', category: 'edukasi' },
  { title: 'Universitas Bina Nusantara', image: '/images/areas/binus.png', category: 'edukasi' },
  // Kantor
  { title: 'Bintaro Trade Center', image: '/images/areas/bintarotradecenter.png', category: 'kantor' },
  { title: 'CBD Bintaro Jaya', image: '/images/areas/rumahsakit.png', category: 'kantor' },
  { title: 'Perkantoran Sector 7', image: '/images/areas/rumahsakit.png', category: 'kantor' },
  // Hiburan
  { title: 'XXI Bintaro Plaza', image: '/images/areas/bintaroxchange.png', category: 'hiburan' },
  { title: 'Timezone', image: '/images/areas/rumahsakit.png', category: 'hiburan' },
  { title: 'Taman Kota', image: '/images/areas/rumahsakit.png', category: 'hiburan' },
  // Olahraga
  { title: 'Lapangan Golf BSD', image: '/images/areas/rumahsakit.png', category: 'olahraga' },
  { title: 'GOR Bintaro', image: '/images/areas/rumahsakit.png', category: 'olahraga' },
  { title: 'Kolam Renang Bintaro', image: '/images/areas/rumahsakit.png', category: 'olahraga' },
  { title: 'Fitness Center', image: '/images/areas/rumahsakit.png', category: 'olahraga' },
  // Belanja
  { title: 'Bintaro Jaya Xchange', image: '/images/areas/bintaroxchange.png', category: 'belanja' },
  { title: 'Lotte Mart', image: '/images/areas/lottemart.png', category: 'belanja' },
  { title: 'Giant Supermarket', image: '/images/areas/rumahsakit.png', category: 'belanja' },
]

async function main() {
  console.log('Seeding blog posts...')
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        date: new Date(post.date),
        image: post.image,
        excerpt: post.excerpt,
        content: post.content,
      },
    })
  }
  console.log(`✓ ${blogPosts.length} blog posts seeded.`)

  console.log('Seeding kavlings...')
  for (const k of kavlings) {
    await prisma.kavling.upsert({
      where: { slug: k.slug },
      update: {},
      create: {
        name: k.name,
        slug: k.slug,
        kodeBlok: k.kodeBlok,
        cluster: k.cluster,
        image: k.image,
        size: k.size,
        hot: k.hot || false,
        description: k.description || null,
        images: k.images ? JSON.stringify(k.images) : null,
      },
    })
  }
  console.log(`✓ ${kavlings.length} kavlings seeded.`)

  console.log('Seeding facilities...')
  // Clear existing facilities first to avoid duplicates
  await prisma.facility.deleteMany()
  for (const f of facilities) {
    await prisma.facility.create({
      data: {
        title: f.title,
        image: f.image,
        category: f.category,
      },
    })
  }
  console.log(`✓ ${facilities.length} facilities seeded.`)

  console.log('Seeding properties (clusters)...')
  const { areas } = require('../src/data/areas')
  for (const area of areas) {
    const property = await prisma.property.upsert({
      where: { slug: area.slug },
      update: {},
      create: {
        name: area.name,
        slug: area.slug,
        image: area.image,
        hot: area.hot || false,
        virtualRoomUrl: area.virtualRoomUrl || null,
        brosurUrl: area.brosurUrl || null,
        description: area.description || null,
      },
    })

    console.log(`  - Seeding types for ${area.name}...`)
    for (const prod of area.products) {
      // Store all specs as JSON, but keep core ones as columns
      const { type, bedrooms, bathrooms, carPack, images, ...otherSpecs } = prod
      await prisma.propertyType.create({
        data: {
          propertyId: property.id,
          type: type,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          carPack: carPack,
          specs: JSON.stringify(otherSpecs),
          images: JSON.stringify(images),
        },
      })
    }
  }
  console.log(`✓ ${areas.length} properties seeded.`)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
