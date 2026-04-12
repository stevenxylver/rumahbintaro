'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface Area {
    name: string
    slug: string
    image: string
    hot?: boolean
}

const ITEMS_PER_PAGE = 10 // 5 per row x 2 rows

export function PropertyGridClient({ properties }: { properties: Area[] }) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentProperties = properties.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
                {/* Title */}
                <div className="text-center mb-8 md:mb-16">
                    <div className="flex justify-center gap-x-4 md:block">
                        <h1 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 whitespace-nowrap">
                            Daftar
                        </h1>
                        <h1 className="text-xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
                            <span className="text-blue-600">Properti</span>{' '}
                            <span className="text-gray-900">Kami</span>
                        </h1>
                    </div>
                    <p className="text-gray-500 mt-4">
                        Menampilkan <span className="font-semibold text-gray-800">{properties.length}</span> properti
                    </p>
                </div>

                {/* Grid: 1 col mobile, 3 cols tablet, 5 cols desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                    {currentProperties.map((property) => (
                        <Link
                            key={property.slug}
                            href={`/properties/${property.slug}`}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                        >
                            {property.hot && (
                                <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                    🔥 HOT
                                </div>
                            )}
                            <Image
                                src={property.image}
                                alt={property.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                                <h3 className="text-white font-bold text-sm md:text-base lg:text-lg uppercase tracking-wide">
                                    {property.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {properties.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Tidak ada properti yang ditemukan</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-full font-medium transition-all ${currentPage === page
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
