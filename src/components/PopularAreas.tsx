'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { areas } from '@/data/areas'

const ITEMS_PER_PAGE = 10 // 5 per row x 2 rows

export function PopularAreas() {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [mobileSlide, setMobileSlide] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)

    const totalPages = Math.ceil(areas.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentAreas = areas.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return
            const rect = sectionRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight * 0.5)))
                setScrollProgress(progress)
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const grayValue = Math.round(180 - (scrollProgress * 180))
    const textColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`
    const mobileArea = areas[mobileSlide]

    return (
        <section ref={sectionRef} className="pt-6 pb-6 md:py-20 bg-white overflow-hidden">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                style={{ transform: `translateY(${Math.max(0, 50 - scrollProgress * 50)}px)` }}
            >
                {/* Title */}
                <div
                    className="text-center mb-8 md:mb-16"
                    style={{
                        transform: `translateY(${Math.max(0, 30 - scrollProgress * 60)}px)`,
                        opacity: Math.min(1, scrollProgress * 1.5)
                    }}
                >
                    <h2
                        className="text-xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        Properti Pilihan
                    </h2>
                    <h2
                        className="text-xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        <span style={{ color: scrollProgress > 0.5 ? '#2563eb' : `rgb(${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))})` }}>Terbaik</span> Bintaro
                    </h2>
                </div>

                {/* ── MOBILE: single-item slider ── */}
                <div className="md:hidden">
                    <div className="relative">
                        <Link
                            href={`/properties/${mobileArea.slug}`}
                            className="block relative aspect-[4/3] rounded-2xl overflow-hidden"
                        >
                            {mobileArea.hot && (
                                <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-lg">
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
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md disabled:opacity-30 transition-all"
                        >
                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Next arrow */}
                        <button
                            onClick={() => setMobileSlide(prev => Math.min(areas.length - 1, prev + 1))}
                            disabled={mobileSlide === areas.length - 1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md disabled:opacity-30 transition-all"
                        >
                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-1.5 mt-4">
                        {areas.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setMobileSlide(i)}
                                className={`rounded-full transition-all duration-200 ${i === mobileSlide
                                    ? 'w-5 h-2 bg-blue-600'
                                    : 'w-2 h-2 bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* ── DESKTOP: grid + pagination (unchanged) ── */}
                <div className="hidden md:block">
                    <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {currentAreas.map((area, index) => (
                            <Link
                                key={area.slug}
                                href={`/properties/${area.slug}`}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                                style={{
                                    opacity: Math.min(1, scrollProgress * 2 - (index * 0.05)),
                                    transform: `translateY(${Math.max(0, 20 - scrollProgress * 40)}px)`
                                }}
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
                        <div className="flex justify-center items-center gap-2 mt-10">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
