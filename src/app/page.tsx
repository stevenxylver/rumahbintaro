import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PropertyGrid } from '@/components/PropertyGrid'
import { PopularAreas } from '@/components/PopularAreas'
import { MainHero } from '@/components/MainHero'
import { GoogleMapSection } from '@/components/GoogleMapSection'
import { FacilitiesSection } from '@/components/FacilitiesSection'
import { PartnerBank } from '@/components/PartnerBank'
import { KavlingSection } from '@/components/KavlingSection'

async function getFeaturedProperties() {
  const properties = await prisma.property.findMany({
    where: { featured: true, status: 'AVAILABLE' },
    take: 6,
    orderBy: { createdAt: 'desc' }
  })
  return properties
}

async function getLatestProperties() {
  const properties = await prisma.property.findMany({
    where: { status: 'AVAILABLE' },
    take: 6,
    orderBy: { createdAt: 'desc' }
  })
  return properties
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()
  const latestProperties = await getLatestProperties()

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <MainHero />

      {/* Popular Areas */}
      <PopularAreas />

      {/* Kavling Section */}
      <KavlingSection />

      {/* Google Map Section */}
      <GoogleMapSection />

      {/* Facilities Section */}
      <FacilitiesSection />

      {/* Partner Bank */}
      <PartnerBank />
    </div>
  )
}
