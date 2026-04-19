'use client'

import { useState } from 'react'
import { trackWhatsAppClick } from '@/lib/gtag'

const BENEFITS = [
    { title: 'Free PPN', icon: '🏠' },
    { title: 'Free DP', icon: '💰' },
    { title: 'Free AC', icon: '❄️' },
    { title: 'Free CCTV', icon: '📹' },
    { title: 'Instant Approval', icon: '⚡' },
    { title: 'Free Canopy', icon: '🛖' },
    { title: 'Free Solar Panel', icon: '☀️' },
    { title: 'Free Kitchen Set', icon: '🍳' },
    { title: 'Free Smart Door Lock', icon: '🔐' },
    { title: 'Free Smart Home System', icon: '📱' },
    { title: 'Free Water Heater', icon: '🛀' },
    { title: 'Free EV Charging Installation', icon: '🔌' },
]

const ITEMS_PER_PAGE_MOBILE = 6

export function PromoReadySection() {
    const [mobilePage, setMobilePage] = useState(1)
    const totalPagesMobile = Math.ceil(BENEFITS.length / ITEMS_PER_PAGE_MOBILE)

    const mobileStart = (mobilePage - 1) * ITEMS_PER_PAGE_MOBILE
    const currentBenefitsMobile = BENEFITS.slice(mobileStart, mobileStart + ITEMS_PER_PAGE_MOBILE)

    return (
        <section className="pt-8 pb-8 md:py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                        Unit <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Siap Huni</span>
                    </h2>
                    <p className="hidden md:block mt-4 text-gray-500 max-w-2xl mx-auto">
                        Banyak keuntungan spesial untuk Anda! Nikmati promo melimpah untuk hunian impian yang sudah siap ditempati sekarang juga.
                    </p>
                </div>

                {/* ── MOBILE: 2 cols x 3 rows grid with pagination ── */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-4">
                        {currentBenefitsMobile.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center min-h-[140px]"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-3xl mb-3">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 text-xs tracking-tight leading-tight">
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Pagination Controls */}
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
                </div>

                {/* ── DESKTOP: 3 Column Grid ── */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-3 gap-8">
                        {BENEFITS.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex items-start gap-6"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-gray-800 text-xl tracking-tight pt-3">
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
