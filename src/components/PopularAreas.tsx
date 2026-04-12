'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { areas } from '@/data/areas'

const ITEMS_PER_PAGE = 10 // 5 per row x 2 rows

export function PopularAreas() {
    const [currentPage, setCurrentPage] = useState(1)
    const [mobileSlide, setMobileSlide] = useState(0)

    const totalPages = Math.ceil(areas.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentAreas = areas.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    const mobileArea = areas[mobileSlide]

    return (
        <section className="pt-4 pb-8 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
                {/* Title */}
                <div className="text-center mb-8 md:mb-16">
                    {/* Mobile: satu baris | Desktop: dua baris */}
                    <div className="flex flex-wrap justify-center gap-x-4 md:block">
                        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 whitespace-nowrap">
                            Properti Pilihan
                        </h2>
                        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
                            <span className="text-blue-600">Terbaik</span>{' '}
                            <span className="text-gray-900">Bintaro</span>
                        </h2>
                    </div>
                </div>

                {/* ── MOBILE: single-item slider ── */}
                <div className="md:hidden">
                    <div className="relative">
                        <Link
                            href={`/properties/${mobileArea.slug}`}
                            className="block relative aspect-[4/3] rounded-2xl overflow-hidden"
                        >
                            {mobileArea.hot && (
                                <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                    🔥 HOT
                                </div>
                            )}
                            <Image
                                src={mobileArea.image}
                                alt={mobileArea.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                                    {mobileArea.name}
                                </h3>
                            </div>
                        </Link>

                        {/* Prev arrow */}
                        <button
                            onClick={() => setMobileSlide(prev => Math.max(0, prev - 1))}
                            disabled={mobileSlide === 0}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md disabled:opacity-30 transition-all"
                        >
                            <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Next arrow */}
                        <button
                            onClick={() => setMobileSlide(prev => Math.min(areas.length - 1, prev + 1))}
                            disabled={mobileSlide === areas.length - 1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md disabled:opacity-30 transition-all"
                        >
                            <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {areas.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setMobileSlide(i)}
                                className={`rounded-full transition-all duration-200 ${i === mobileSlide
                                    ? 'w-4 h-2 bg-blue-600'
                                    : 'w-2 h-2 bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* ── DESKTOP: grid + pagination (unchanged) ── */}
                <div className="hidden md:block">
                    <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                        {currentAreas.map((area) => (
                            <Link
                                key={area.slug}
                                href={`/properties/${area.slug}`}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                            >
                                {area.hot && (
                                    <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                        🔥 HOT
                                    </div>
                                )}
                                <Image
                                    src={area.image}
                                    alt={area.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                                    <h3 className="text-white font-bold text-sm md:text-base lg:text-lg uppercase tracking-wide">
                                        {area.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Pagination */}
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
            </div>
        </section>
    )
}
