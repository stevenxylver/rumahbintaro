'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { kavlings } from '@/data/kavlings'

const ITEMS_PER_PAGE = 8

export function KavlingSection() {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)

    const totalPages = Math.ceil(kavlings.length / ITEMS_PER_PAGE)
    const paginatedKavlings = kavlings.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)

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
        <section id="kavling" ref={sectionRef} className="py-20 bg-gray-50 overflow-hidden">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                style={{
                    transform: `translateY(${Math.max(0, 50 - scrollProgress * 50)}px)`,
                }}
            >
                {/* Section Title */}
                <div
                    className="text-center mb-16"
                    style={{
                        transform: `translateY(${Math.max(0, 30 - scrollProgress * 60)}px)`,
                        opacity: Math.min(1, scrollProgress * 1.5)
                    }}
                >
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        Tanah Kavling
                    </h2>
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        <span style={{ color: scrollProgress > 0.5 ? '#2563eb' : `rgb(${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))})` }}>Siap</span> Bangun
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                        Temukan tanah kavling strategis di berbagai lokasi premium Bintaro dan sekitarnya
                    </p>
                </div>

                {/* Kavling Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
                            {/* Image */}
                            <Image
                                src={kavling.image}
                                alt={kavling.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                            {/* Hot Badge */}
                            {kavling.hot && (
                                <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full">
                                    🔥 HOT
                                </div>
                            )}

                            {/* Size Badge */}
                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                📐 {kavling.size}
                            </div>

                            {/* Title */}
                            <div className="absolute inset-0 flex flex-col justify-end p-3">
                                <h3 className="text-white font-bold text-sm md:text-base">
                                    {kavling.cluster}
                                </h3>
                                <p className="text-white/70 text-xs">
                                    {kavling.kodeBlok}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
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
            </div>
        </section>
    )
}
