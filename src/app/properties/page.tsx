import { PropertyGridClient } from '@/components/PropertyGridClient'
import { areas } from '@/data/areas'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Daftar Properti',
    description: 'Jelajahi koleksi properti terbaik kami di Bintaro. Filter berdasarkan harga, lokasi, dan status.',
}

export default function PropertiesPage() {
    return (
        <div className="min-h-screen bg-white">
            <PropertyGridClient properties={areas} />
        </div>
    )
}
