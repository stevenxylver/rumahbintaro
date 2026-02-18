import { PopularAreas } from '@/components/PopularAreas'
import { MainHero } from '@/components/MainHero'
import { GoogleMapSection } from '@/components/GoogleMapSection'
import { FacilitiesSection } from '@/components/FacilitiesSection'
import { PartnerBank } from '@/components/PartnerBank'
import { KavlingSection } from '@/components/KavlingSection'

export default function HomePage() {
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
