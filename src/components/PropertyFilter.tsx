'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface PropertyFilterProps {
    locations: string[]
}

export function PropertyFilter({ locations }: PropertyFilterProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
    const [location, setLocation] = useState(searchParams.get('location') || '')
    const [status, setStatus] = useState(searchParams.get('status') || '')

    const applyFilters = () => {
        const params = new URLSearchParams()
        if (minPrice) params.set('minPrice', minPrice)
        if (maxPrice) params.set('maxPrice', maxPrice)
        if (location) params.set('location', location)
        if (status) params.set('status', status)

        router.push(`/properties?${params.toString()}`)
    }

    const clearFilters = () => {
        setMinPrice('')
        setMaxPrice('')
        setLocation('')
        setStatus('')
        router.push('/properties')
    }

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter Properti
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Min Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Harga Minimum</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min harga..."
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>

                {/* Max Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Harga Maksimum</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max harga..."
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Lokasi</label>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    >
                        <option value="" className="bg-gray-900">Semua Lokasi</option>
                        {locations.map((loc) => (
                            <option key={loc} value={loc} className="bg-gray-900">{loc}</option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    >
                        <option value="" className="bg-gray-900">Semua Status</option>
                        <option value="AVAILABLE" className="bg-gray-900">Tersedia</option>
                        <option value="SOLD" className="bg-gray-900">Terjual</option>
                        <option value="RESERVED" className="bg-gray-900">Reserved</option>
                    </select>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={applyFilters}
                    className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all shadow-lg shadow-white/10"
                >
                    Terapkan Filter
                </button>
                <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all border border-white/10"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

