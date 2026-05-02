import { PopularAreasWrapper } from '@/components/PopularAreasWrapper'
import { MainHero } from '@/components/MainHero'
import { GoogleMapSection } from '@/components/GoogleMapSection'
import { FacilitiesSectionWrapper } from '@/components/FacilitiesSectionWrapper'
import { PartnerBank } from '@/components/PartnerBank'
import { KavlingSection } from '@/components/KavlingSection'
import { IconLinkSection } from '@/components/IconLinkSection'
import { Ctaformpromo } from '@/components/CtaFormPromo'
import { PromoReadySection } from '@/components/PromoReadySection'
import db from '@/lib/db'

export default async function HomePage() {
  const promos = await db.promo.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8 // Limit to 8 latest promos so it doesn't break layout if too many
  })

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <MainHero />

      {/* Icon Link Section */}
      <IconLinkSection />

      {/* Popular Areas (Properti) */}
      <PopularAreasWrapper />

      {/* Promo Ready Section (Diletakkan setelah produk untuk menarik minat) */}
      <PromoReadySection />

      {/* CTA Form Promo (Formulir setelah melihat promo agar user langsung mengisi) */}
      <Ctaformpromo promos={promos} />

      {/* Kavling Section */}
      <KavlingSection />

      {/* Facilities Section (Fasilitas) */}
      <FacilitiesSectionWrapper />

      {/* Google Map Section (Peta Lokasi berdampingan dengan Fasilitas) */}
      <GoogleMapSection />

      {/* Partner Bank */}
      <PartnerBank />
    </div>
  )
}
