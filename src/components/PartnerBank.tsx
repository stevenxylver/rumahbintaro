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
    const [scrollProgress, setScrollProgress] = useState(0)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [itemsPerSlide, setItemsPerSlide] = useState(ITEMS_PER_SLIDE_DESKTOP)
    const sectionRef = useRef<HTMLElement>(null)
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

    // Scroll animation
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

    const currentBanks = banks.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide)

    return (
        <section ref={sectionRef} className="py-12 md:py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div
                    className="text-center mb-10 md:mb-16"
                    style={{
                        transform: `translateY(${Math.max(0, 30 - scrollProgress * 60)}px)`,
                        opacity: Math.min(1, scrollProgress * 1.5)
                    }}
                >
                    <h2
                        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        Partner Bank Kami.
                    </h2>
                    <h2
                        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        <span style={{ color: scrollProgress > 0.5 ? '#2563eb' : `rgb(${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))})` }}>KPR</span> Terpercaya.
                    </h2>
                </div>

                {/* Slider */}
                <div className="relative">
                    {/* Bank Logos Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 transition-opacity duration-500">
                        {currentBanks.map((bank) => (
                            <div
                                key={bank.name}
                                className="flex items-center justify-center p-4 md:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
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
                                        ? 'w-8 h-3 bg-blue-600'
                                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
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
