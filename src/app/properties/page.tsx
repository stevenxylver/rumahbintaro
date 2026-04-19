import { PropertyGridClient } from '@/components/PropertyGridClient'
import db from '@/lib/db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Daftar Properti',
    description: 'Jelajahi koleksi properti terbaik kami di Bintaro. Filter berdasarkan harga, lokasi, dan status.',
}

export default async function PropertiesPage() {
    const properties = await db.property.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="min-h-screen bg-white">
            <PropertyGridClient properties={properties} />
        </div>
    )
}
