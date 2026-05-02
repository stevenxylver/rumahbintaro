'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { kavlings } from '@/data/kavlings'

const ITEMS_PER_PAGE_MOBILE = 6 // 3 rows x 2 cols
const ITEMS_PER_PAGE_DESKTOP = 8

export function KavlingSection() {
    const [currentPage, setCurrentPage] = useState(0)
    const [mobilePage, setMobilePage] = useState(1)

    const totalPagesDesktop = Math.ceil(kavlings.length / ITEMS_PER_PAGE_DESKTOP)
    const totalPagesMobile = Math.ceil(kavlings.length / ITEMS_PER_PAGE_MOBILE)

    const paginatedKavlings = kavlings.slice(currentPage * ITEMS_PER_PAGE_DESKTOP, (currentPage + 1) * ITEMS_PER_PAGE_DESKTOP)

    const mobileStart = (mobilePage - 1) * ITEMS_PER_PAGE_MOBILE
    const currentKavlingsMobile = kavlings.slice(mobileStart, mobileStart + ITEMS_PER_PAGE_MOBILE)

    return (
        <section id="kavling" className="pt-8 pb-8 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-8 md:mb-16">
                    <div className="flex flex-wrap justify-center gap-x-4 md:block">
                        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 whitespace-nowrap">
                            Kavling Eksklusif
                        </h2>
                        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
                            <span className="text-blue-600">Investasi</span>{' '}
                            <span className="text-gray-900">Cerdas</span>
                        </h2>
                    </div>
                    <p className="hidden md:block mt-4 text-gray-500 max-w-2xl mx-auto">
                        Miliki tanah kavling strategis di jantung Bintaro — lokasi premium, harga kompetitif, nilai investasi terus berkembang
                    </p>
                </div>

                {/* ── MOBILE: 2 cols x 3 rows grid with slider ── */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-4">
                        {currentKavlingsMobile.map((kavling) => (
                            <Link
                                key={kavling.slug}
                                href={`/kavling/${kavling.slug}`}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={kavling.image}
                                    alt={kavling.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium rounded-full">
                                    📐 {kavling.size}
                                </div>
                                <div className="absolute inset-0 flex flex-col justify-end p-2">
                                    <h3 className="text-white font-bold text-xs">{kavling.cluster}</h3>
                                    <p className="text-white/70 text-[10px]">{kavling.kodeBlok}</p>
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

                    {/* Lihat Semua (mobile) */}
                    <div className="flex justify-center mt-8">
                        <a
                            href="/kavling"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
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
                    <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {paginatedKavlings.map((kavling) => (
                            <Link
                                key={kavling.slug}
                                href={`/kavling/${kavling.slug}`}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={kavling.image}
                                    alt={kavling.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                    📐 {kavling.size}
                                </div>
                                <div className="absolute inset-0 flex flex-col justify-end p-4">
                                    <h3 className="text-white font-bold text-sm md:text-base">{kavling.cluster}</h3>
                                    <p className="text-white/70 text-xs">{kavling.kodeBlok}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Pagination dots */}
                    {totalPagesDesktop > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-12">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPagesDesktop }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`w-4 h-4 rounded-full transition-all ${currentPage === i
                                            ? 'bg-blue-600 scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPagesDesktop - 1, prev + 1))}
                                disabled={currentPage === totalPagesDesktop - 1}
                                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Lihat Semua Button (desktop) */}
                    <div className="flex justify-center mt-12">
                        <a
                            href="/kavling"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
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
