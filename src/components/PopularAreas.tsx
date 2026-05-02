'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
const ITEMS_PER_PAGE_MOBILE = 6 // 3 rows x 2 cols
const ITEMS_PER_PAGE_DESKTOP = 10

interface PopularAreasProps {
    properties?: any[]
}

export function PopularAreas({ properties = [] }: PopularAreasProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [mobilePage, setMobilePage] = useState(1)

    const totalPagesDesktop = Math.ceil(properties.length / ITEMS_PER_PAGE_DESKTOP)
    const totalPagesMobile = Math.ceil(properties.length / ITEMS_PER_PAGE_MOBILE)

    const desktopStart = (currentPage - 1) * ITEMS_PER_PAGE_DESKTOP
    const currentAreasDesktop = properties.slice(desktopStart, desktopStart + ITEMS_PER_PAGE_DESKTOP)

    const mobileStart = (mobilePage - 1) * ITEMS_PER_PAGE_MOBILE
    const currentAreasMobile = properties.slice(mobileStart, mobileStart + ITEMS_PER_PAGE_MOBILE)

    return (
        <section className="pt-4 pb-8 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
                {/* Title */}
                <div className="text-center mb-8 md:mb-16">
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

                {/* ── MOBILE: 2 cols x 3 rows grid with slider ── */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-4">
                        {currentAreasMobile.map((area) => (
                            <Link
                                key={area.slug}
                                href={`/properties/${area.slug}`}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                            >
                                <div className="absolute top-2 right-2 z-10">
                                    <div className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] font-bold rounded-full shadow-md whitespace-nowrap">
                                        {area.hot ? 'Siap Huni & Free PPN' : 'Free PPN'}
                                    </div>
                                </div>
                                <Image
                                    src={area.image}
                                    alt={area.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                                    <h3 className="text-white font-bold text-xs uppercase tracking-wide">
                                        {area.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Slider Controls */}
                    {totalPagesMobile > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={() => setMobilePage(prev => Math.max(1, prev - 1))}
                                disabled={mobilePage === 1}
                                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 disabled:opacity-30 transition-all shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPagesMobile }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setMobilePage(i + 1)}
                                        className={`rounded-full transition-all ${mobilePage === i + 1
                                            ? 'w-6 h-2 bg-blue-600'
                                            : 'w-2 h-2 bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => setMobilePage(prev => Math.min(totalPagesMobile, prev + 1))}
                                disabled={mobilePage === totalPagesMobile}
                                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 disabled:opacity-30 transition-all shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* ── DESKTOP: 5 cols grid ── */}
                <div className="hidden md:block">
                    <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                        {currentAreasDesktop.map((area) => (
                            <Link
                                key={area.slug}
                                href={`/properties/${area.slug}`}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                            >
                                <div className="absolute top-3 right-3 z-10">
                                    <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] md:text-xs font-bold rounded-full shadow-md whitespace-nowrap">
                                        {area.hot ? 'Siap Huni & Free PPN' : 'Free PPN'}
                                    </div>
                                </div>
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
                    {totalPagesDesktop > 1 && (
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
                            {Array.from({ length: totalPagesDesktop }, (_, i) => i + 1).map(page => (
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
                                onClick={() => setCurrentPage(prev => Math.min(totalPagesDesktop, prev + 1))}
                                disabled={currentPage === totalPagesDesktop}
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
