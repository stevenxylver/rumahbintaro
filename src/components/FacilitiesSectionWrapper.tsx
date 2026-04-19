import db from '@/lib/db'
import { FacilitiesSection } from './FacilitiesSection'

export async function FacilitiesSectionWrapper() {
    const facilities = await db.facility.findMany({
        orderBy: { category: 'asc' },
    })

    const facilitiesData = facilities.map(f => ({
        title: f.title,
        image: f.image,
        category: f.category,
    }))

    return <FacilitiesSection facilities={facilitiesData} />
}
