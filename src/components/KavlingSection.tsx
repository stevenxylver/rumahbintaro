'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { kavlings } from '@/data/kavlings'

const ITEMS_PER_PAGE = 8

export function KavlingSection() {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [mobileSlide, setMobileSlide] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)

    const totalPages = Math.ceil(kavlings.length / ITEMS_PER_PAGE)
    const paginatedKavlings = kavlings.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
    const mobileKavling = kavlings[mobileSlide]

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

    return (
        <section id="kavling" ref={sectionRef} className="pt-6 pb-6 md:py-20 bg-white overflow-hidden">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                style={{ transform: `translateY(${Math.max(0, 50 - scrollProgress * 50)}px)` }}
            >
                {/* Section Title */}
                <div
                    className="text-center mb-4 md:mb-16"
                    style={{
                        transform: `translateY(${Math.max(0, 30 - scrollProgress * 60)}px)`,
                        opacity: Math.min(1, scrollProgress * 1.5)
                    }}
                >
                    <div className="flex flex-wrap justify-center gap-x-3 md:block">
                        <h2
                            className="text-xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300 whitespace-nowrap"
                            style={{ color: textColor }}
                        >
                            Kavling Eksklusif
                        </h2>
                        <h2
                            className="text-xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300 whitespace-nowrap"
                            style={{ color: textColor }}
                        >
                            <span style={{ color: scrollProgress > 0.5 ? '#2563eb' : `rgb(${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))})` }}>Investasi</span> Cerdas
                        </h2>
                    </div>
                    <p className="hidden md:block mt-4 text-gray-500 max-w-2xl mx-auto">
                        Miliki tanah kavling strategis di jantung Bintaro — lokasi premium, harga kompetitif, nilai investasi terus berkembang
                    </p>
                </div>

                {/* ── MOBILE: single-item slider ── */}
                <div className="md:hidden">
                    <div className="relative">
                        <Link
                            href={`/kavling/${mobileKavling.slug}`}
                            className="block relative aspect-[4/3] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={mobileKavling.image}
                                alt={mobileKavling.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                            {mobileKavling.hot && (
                                <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full">
                                    🔥 HOT
                                </div>
                            )}
                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium rounded-full">
                                📐 {mobileKavling.size}
                            </div>
                            <div className="absolute inset-0 flex flex-col justify-end p-4">
                                <h3 className="text-white font-bold text-base">{mobileKavling.cluster}</h3>
                                <p className="text-white/70 text-xs">{mobileKavling.kodeBlok}</p>
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
                            onClick={() => setMobileSlide(prev => Math.min(kavlings.length - 1, prev + 1))}
                            disabled={mobileSlide === kavlings.length - 1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md disabled:opacity-30 transition-all"
                        >
                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-1.5 mt-4">
                        {kavlings.map((_, i) => (
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

                    {/* Lihat Semua (mobile) */}
                    <div className="flex justify-center mt-6">
                        <a
                            href="/kavling"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                        >
                            Lihat Semua Kavling
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* ── DESKTOP: grid + pagination ── */}
                <div className="hidden md:block">
                    <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {paginatedKavlings.map((kavling, index) => (
                            <Link
                                key={kavling.slug}
                                href={`/kavling/${kavling.slug}`}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                                style={{
                                    opacity: Math.min(1, scrollProgress * 2 - (index * 0.05)),
                                    transform: `translateY(${Math.max(0, 20 - scrollProgress * 40)}px)`
                                }}
                            >
                                <Image
                                    src={kavling.image}
                                    alt={kavling.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                {kavling.hot && (
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full">
                                        🔥 HOT
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                    📐 {kavling.size}
                                </div>
                                <div className="absolute inset-0 flex flex-col justify-end p-3">
                                    <h3 className="text-white font-bold text-sm md:text-base">{kavling.cluster}</h3>
                                    <p className="text-white/70 text-xs">{kavling.kodeBlok}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Pagination dots */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`w-3 h-3 rounded-full transition-all ${currentPage === i
                                            ? 'bg-blue-600 scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Lihat Semua Button (desktop) */}
                    <div className="flex justify-center mt-10">
                        <a
                            href="/kavling"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                        >
                            Lihat Semua Kavling
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
