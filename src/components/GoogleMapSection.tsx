'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export function GoogleMapSection() {
    const [scrollProgress, setScrollProgress] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)

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
        <section ref={sectionRef} className="pt-6 pb-6 md:py-20 bg-white overflow-hidden">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                style={{
                    transform: `translateY(${Math.max(0, 50 - scrollProgress * 50)}px)`,
                }}
            >
                {/* Section Title with Parallax */}
                <div
                    className="text-center mb-2 md:mb-12"
                    style={{
                        transform: `translateY(${Math.max(0, 30 - scrollProgress * 60)}px)`,
                        opacity: Math.min(1, scrollProgress * 1.5)
                    }}
                >
                    <h2
                        className="text-xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300 whitespace-nowrap"
                        style={{ color: textColor }}
                    >
                        Lokasi Kami
                    </h2>
                    <p
                        className="hidden md:block text-lg md:text-xl mt-4 transition-colors duration-300"
                        style={{ color: `rgb(${Math.min(180, grayValue + 50)}, ${Math.min(180, grayValue + 50)}, ${Math.min(180, grayValue + 50)})` }}
                    >
                        Temukan properti impian Anda di Bintaro dan sekitarnya
                    </p>
                </div>

                {/* Map Image Container */}
                <div
                    className="relative rounded-none md:rounded-3xl overflow-hidden md:shadow-2xl"
                    style={{
                        opacity: Math.min(1, scrollProgress * 1.5),
                        transform: `translateY(${Math.max(0, 30 - scrollProgress * 60)}px)`
                    }}
                >
                    {/* Full Map Image - 3:2 aspect ratio for 1536x1024 */}
                    <div className="aspect-[3/2] relative">
                        <Image
                            src="/images/map.png"
                            alt="Lokasi Rumah Bintaro"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
