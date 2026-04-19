import db from '@/lib/db'
import { PopularAreas } from './PopularAreas'

export async function PopularAreasWrapper() {
    const properties = await db.property.findMany({
        orderBy: { updatedAt: 'desc' },
    })

    return <PopularAreas properties={properties} />
}
