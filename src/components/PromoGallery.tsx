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

export function PromoGallery({ promos = [] }: PromoGalleryProps) {
    const safePromos = promos || []
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1) // Default mobile
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Detect screen size for items per page
    useEffect(() => {
        const updateItems = () => {
            setItemsPerPage(window.innerWidth < 768 ? 1 : 4)
        }
        updateItems()
        window.addEventListener('resize', updateItems)
        return () => window.removeEventListener('resize', updateItems)
    }, [])

    const totalPages = Math.ceil(safePromos.length / itemsPerPage)

    const nextSlide = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % totalPages)
    }, [totalPages])

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages)
    }

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (totalPages <= 1) return
        intervalRef.current = setInterval(nextSlide, 5000)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [nextSlide, totalPages])

    // Touch handlers for mobile swipe
    const minSwipeDistance = 50
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }
    const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) nextSlide()
        if (isRightSwipe) prevSlide()
    }

    const visiblePromos = safePromos.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    )

    console.log('PromoGallery Data:', safePromos);

    if (safePromos.length === 0) return null

    return (
        <div className="max-w-7xl mx-auto mb-20 px-4 md:px-0">
            {/* Section Title */}
            <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                    Promo <span className="text-blue-600">Terupdate</span> <br className="hidden md:block" />
                    <span className="text-gray-900">Bulan Ini</span>
                </h2>
            </div>

            <div 
                className="relative group/gallery"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Navigation Arrows (Desktop Only) */}
                {totalPages > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg border border-gray-100 items-center justify-center text-gray-600 hover:text-blue-600 transition-all opacity-0 group-hover/gallery:opacity-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg border border-gray-100 items-center justify-center text-gray-600 hover:text-blue-600 transition-all opacity-0 group-hover/gallery:opacity-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Cards Grid - Dynamic Columns */}
                <div 
                    className={`grid gap-6 md:gap-8 transition-all duration-700 ease-in-out ${
                        itemsPerPage === 1 ? 'grid-cols-1' : 'grid-cols-4'
                    }`}
                >
                    {visiblePromos.map((promo, i) => (
                        <div key={promo.id} className="group relative w-full">
                            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-500 group-hover:shadow-blue-200 group-hover:-translate-y-2">
                                <Image
                                    src={promo.image}
                                    alt={promo.title || `Promo ${i}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority={currentIndex === 0}
                                />
                                
                                {/* Status Badge */}
                                <div className="absolute top-6 left-6">
                                    <div className="px-4 py-1.5 bg-blue-600/90 backdrop-blur-md text-white rounded-full text-[10px] font-black tracking-widest shadow-lg">
                                        TERBATAS
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot Indicators */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-10">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`transition-all duration-500 rounded-full ${
                                    currentIndex === i 
                                    ? 'w-10 h-2.5 bg-blue-600 shadow-md shadow-blue-200' 
                                    : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
