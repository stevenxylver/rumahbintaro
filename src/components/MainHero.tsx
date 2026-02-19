'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function MainHero() {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
            {/* Background Video - Right Side */}
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/intro.mp4" type="video/mp4" />
                </video>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
            </div>

            {/* Content - Left Side */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-2xl">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight">
                        <span className="block text-gray-900">TEMUKAN</span>
                        <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">RUMAH IMPIAN</span>
                        <span className="block text-gray-900">ANDA</span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-md leading-relaxed">
                        Portal properti terpercaya di Bintaro dengan pilihan properti terbaik dan harga terjangkau untuk keluarga Anda.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/properties"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg tracking-wide rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 group"
                        >
                            LIHAT PROPERTI
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>


        </section>
    )
}
