'use client'

import Image from 'next/image'
import { useEffect, useState, useRef, useCallback } from 'react'

const banks = [
    { name: 'Bank BCA', logo: '/images/banks/bca.jpeg' },
    { name: 'Bank Mandiri', logo: '/images/banks/mandiri.jpeg' },
    { name: 'Bank BNI', logo: '/images/banks/bni.jpeg' },
    { name: 'Bank Permata', logo: '/images/banks/permata.jpeg' },
    { name: 'Bank BRI', logo: '/images/banks/bri.jpeg' },
    { name: 'Bank CIMB', logo: '/images/banks/cimb.jpeg' },
]

const ITEMS_PER_SLIDE_MOBILE = 3
const ITEMS_PER_SLIDE_DESKTOP = 6
const AUTO_SLIDE_INTERVAL = 3000

export function PartnerBank() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [itemsPerSlide, setItemsPerSlide] = useState(ITEMS_PER_SLIDE_DESKTOP)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const totalSlides = Math.ceil(banks.length / itemsPerSlide)

    // Responsive items per slide
    useEffect(() => {
        const updateItemsPerSlide = () => {
            setItemsPerSlide(window.innerWidth < 768 ? ITEMS_PER_SLIDE_MOBILE : ITEMS_PER_SLIDE_DESKTOP)
        }
        updateItemsPerSlide()
        window.addEventListener('resize', updateItemsPerSlide)
        return () => window.removeEventListener('resize', updateItemsPerSlide)
    }, [])

    // Reset slide when items per slide changes
    useEffect(() => {
        setCurrentSlide(0)
    }, [itemsPerSlide])

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides)
    }, [totalSlides])

    // Auto-slide
    useEffect(() => {
        if (totalSlides <= 1) return
        intervalRef.current = setInterval(nextSlide, AUTO_SLIDE_INTERVAL)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [nextSlide, totalSlides])

    const currentBanks = banks.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide)

    return (
        <section className="pt-8 pb-12 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex justify-center items-baseline gap-x-2 overflow-hidden md:block">
                        <h2 className="text-base md:text-5xl lg:text-6xl font-bold text-gray-900 whitespace-nowrap">
                            Bank Partner Resmi &
                        </h2>
                        <h2 className="text-base md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
                            <span className="text-blue-600">KPR</span>{' '}
                            <span className="text-gray-900">Mudah & Aman.</span>
                        </h2>
                    </div>
                </div>

                {/* Slider */}
                <div className="relative">
                    {/* Bank Logos Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 transition-opacity duration-500">
                        {currentBanks.map((bank) => (
                            <div
                                key={bank.name}
                                className="flex items-center justify-center p-4 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                            >
                                <div className="relative w-full h-12 md:h-16">
                                    <Image
                                        src={bank.logo}
                                        alt={bank.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dot Indicators */}
                    {totalSlides > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {Array.from({ length: totalSlides }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`rounded-full transition-all duration-300 ${currentSlide === i
                                        ? 'w-8 h-4 bg-blue-600'
                                        : 'w-4 h-4 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
