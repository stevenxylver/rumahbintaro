'use client'

import { PropertyCard } from './PropertyCard'

interface Property {
    id: string
    title: string
    slug: string
    description: string
    price: number
    location: string
    bedrooms: number | null
    bathrooms: number | null
    area: number | null
    images: string
    status: string
}

interface PropertyGridProps {
    properties: Property[]
    showEmpty?: boolean
}

export function PropertyGrid({ properties, showEmpty = true }: PropertyGridProps) {
    if (properties.length === 0 && showEmpty) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Properti</h3>
                <p className="text-gray-500">Properti akan segera ditambahkan.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    )
}
