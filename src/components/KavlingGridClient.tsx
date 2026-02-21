'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { Kavling } from '@/data/kavlings'

const ITEMS_PER_PAGE = 12

export function KavlingGridClient({ kavlings }: { kavlings: Kavling[] }) {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const sectionRef = useRef<HTMLElement>(null)

    const totalPages = Math.ceil(kavlings.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentKavlings = kavlings.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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

    const grayValue = Math.round(180 - scrollProgress * 180)
    const textColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`

    return (
        <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
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
                    <h1
                        className="text-xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        Kavling Eksklusif
                    </h1>
                    <h1
                        className="text-xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        <span style={{ color: scrollProgress > 0.5 ? '#2563eb' : `rgb(${Math.round(180 - scrollProgress * 100)}, ${Math.round(180 - scrollProgress * 100)}, ${Math.round(180 - scrollProgress * 100)})` }}>Investasi</span> Cerdas
                    </h1>
                    <p className="text-gray-500 mt-4">
                        <span className="font-semibold text-gray-800">{kavlings.length}</span> kavling premium tersedia — lokasi strategis, nilai terus bertumbuh
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {currentKavlings.map((kavling, index) => (
                        <Link
                            key={kavling.slug}
                            href={`/kavling/${kavling.slug}`}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                            style={{
                                opacity: Math.min(1, scrollProgress * 2 - index * 0.05),
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
                                <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] md:text-xs font-bold rounded-full shadow">
                                    🔥 HOT
                                </div>
                            )}

                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium rounded-full">
                                📐 {kavling.size}
                            </div>

                            <div className="absolute inset-0 flex flex-col justify-end p-3">
                                <h3 className="text-white font-bold text-sm md:text-base">{kavling.cluster}</h3>
                                <p className="text-white/70 text-xs">{kavling.kodeBlok}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {kavlings.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Tidak ada kavling yang ditemukan</p>
                    </div>
                )}

                {/* Pagination */}
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
        </section>
    )
}
