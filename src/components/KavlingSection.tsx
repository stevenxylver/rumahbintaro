'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { kavlings } from '@/data/kavlings'

const ITEMS_PER_PAGE = 8

export function KavlingSection() {
    const [currentPage, setCurrentPage] = useState(0)

    const totalPages = Math.ceil(kavlings.length / ITEMS_PER_PAGE)
    const paginatedKavlings = kavlings.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)

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

                {/* Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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
                            {kavling.hot && (
                                <div className="absolute top-2 left-2 md:top-4 md:left-4 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] md:text-xs font-bold rounded-full">
                                    🔥 HOT
                                </div>
                            )}
                            <div className="absolute top-2 right-2 md:top-4 md:right-4 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium rounded-full">
                                📐 {kavling.size}
                            </div>
                            <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4">
                                <h3 className="text-white font-bold text-xs md:text-base">{kavling.cluster}</h3>
                                <p className="text-white/70 text-[10px] md:text-xs">{kavling.kodeBlok}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination dots */}
                {totalPages > 1 && (
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
                            {Array.from({ length: totalPages }, (_, i) => (
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
                            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                            disabled={currentPage === totalPages - 1}
                            className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Lihat Semua Button */}
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
        </section>
    )
}
