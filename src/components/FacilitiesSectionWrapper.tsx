import db from '@/lib/db'
import { FacilitiesSection } from './FacilitiesSection'

export async function FacilitiesSectionWrapper() {
    const facilities = await db.facility.findMany({
        orderBy: { category: 'asc' },
    })

    const facilitiesData = facilities.map(f => {
        let parsedImages = []
        try {
            parsedImages = f.images ? JSON.parse(f.images) : []
        } catch (e) {
            console.error('Failed to parse facility images:', e)
        }

        return {
            title: f.title,
            image: f.image,
            category: f.category,
            images: Array.isArray(parsedImages) ? parsedImages : [],
        }
    })

    return <FacilitiesSection facilities={facilitiesData} />
}
