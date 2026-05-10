'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'

export interface PromoData {
    id: string;
    image: string;
    title: string | null;
}

interface PromoGalleryProps {
    promos?: PromoData[] | null;
}

const ITEMS_PER_PAGE = 4
const AUTO_SLIDE_INTERVAL = 4000

export function PromoGallery({ promos = [] }: PromoGalleryProps) {
    const safePromos = promos || []
    const needsSlider = safePromos.length > ITEMS_PER_PAGE
    const totalPages = Math.ceil(safePromos.length / ITEMS_PER_PAGE)
    const [currentPage, setCurrentPage] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const nextPage = useCallback(() => {
        setCurrentPage(prev => (prev + 1) % totalPages)
    }, [totalPages])

    // Auto-slide for slider mode
    useEffect(() => {
        if (!needsSlider || totalPages <= 1) return
        intervalRef.current = setInterval(nextPage, AUTO_SLIDE_INTERVAL)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [needsSlider, nextPage, totalPages])

    const visiblePromos = needsSlider
        ? safePromos.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
        : safePromos

    return (
        <div className="max-w-7xl mx-auto mb-20">
            {/* Section Title */}
            <div className="text-center mb-12 md:mb-20">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                    Promo <span className="text-blue-600">Terupdate</span> <br className="hidden md:block" />
                    <span className="text-gray-900">Bulan Ini</span>
                </h2>
            </div>

            {/* Gallery */}
            <div className="relative group/gallery">
                {/* Navigation Arrows (slider mode only) */}
                {needsSlider && totalPages > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)}
                            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all opacity-0 group-hover/gallery:opacity-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => (prev + 1) % totalPages)}
                            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all opacity-0 group-hover/gallery:opacity-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-4 md:px-0 transition-opacity duration-500">
                    {visiblePromos.length > 0 ? (
                        visiblePromos.map((promo, i) => (
                            <div
                                key={promo.id}
                                className="group relative"
                            >
                                <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] group-hover:-translate-y-2">
                                    <Image
                                        src={promo.image}
                                        alt={promo.title || `Promo ${i + 1}`}
                                        fill
                                        className="object-contain p-4 md:p-6 transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Glassmorphism Badge */}
                                    <div className="absolute top-4 left-4">
                                        <div className="px-3 py-1 bg-white/70 backdrop-blur-md border border-white/50 rounded-full text-[10px] font-bold text-blue-600 shadow-sm">
                                            TERBATAS
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-medium">Belum ada promo aktif saat ini.</p>
                            <p className="text-gray-400 text-sm mt-1">Nantikan penawaran menarik dari kami segera.</p>
                        </div>
                    )}
                </div>

                {/* Dot Indicators (slider mode only) */}
                {needsSlider && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i)}
                                className={`rounded-full transition-all duration-300 ${currentPage === i
                                    ? 'w-8 h-3 bg-blue-600'
                                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
