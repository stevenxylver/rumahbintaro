import { PopularAreas } from '@/components/PopularAreas'
import { MainHero } from '@/components/MainHero'
import { GoogleMapSection } from '@/components/GoogleMapSection'
import { FacilitiesSection } from '@/components/FacilitiesSection'
import { PartnerBank } from '@/components/PartnerBank'
import { KavlingSection } from '@/components/KavlingSection'
import { IconLinkSection } from '@/components/IconLinkSection'
import { Ctaformpromo } from '@/components/CtaFormPromo'
import { PromoReadySection } from '@/components/PromoReadySection'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <MainHero />

      {/* Icon Link Section */}
      <IconLinkSection />

      {/* Popular Areas */}
      <PopularAreas />
      <Ctaformpromo />

      {/* Kavling Section */}
      <KavlingSection />

      {/* Google Map Section */}
      <GoogleMapSection />
      <PromoReadySection />

      {/* Facilities Section */}
      <FacilitiesSection />

      {/* Partner Bank */}
      <PartnerBank />
    </div>
  )
}
