'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { trackWhatsAppClick } from '@/lib/gtag'

export function PromoReadySection() {
    const [timeLeft, setTimeLeft] = useState(5 * 60 * 60) // 5 hours in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        return {
            h: h.toString().padStart(2, '0'),
            m: m.toString().padStart(2, '0'),
            s: s.toString().padStart(2, '0')
        }
    }

    const time = formatTime(timeLeft)

    const promoItems = [
        'Free AC', 'Free CCTV', 'Instan Approval', 'Free Canopy',
        'Free Solar Panel', 'Free Kitchen Set', 'Free Smartdoor Lock',
        'Free Smarthome System', 'Free Water Heater',
        'Free EV Charging Installation', 'Cicilan Start 6JT/Bulan'
    ]

    return (
        <section className="py-12 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Images & Cards */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 border border-gray-100">
                            <Image
                                src="/images/areas/dharmawangsa.png"
                                alt="Promo Siap Huni Bintaro Jaya"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* 3 Highlight Cards underneath */}
                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                            {/* Card 1 */}
                            <div className="bg-gradient-to-br from-blue-500 to-blue-400 p-4 rounded-xl text-white shadow-md flex flex-col justify-between h-24 md:h-28">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-bold text-sm md:text-base leading-tight">Siap Huni</span>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white border border-gray-200 p-4 rounded-xl text-gray-800 shadow-sm flex flex-col justify-between h-24 md:h-28">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium text-sm md:text-base leading-tight">Free PPN</span>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white border border-gray-200 p-4 rounded-xl text-gray-800 shadow-sm flex flex-col justify-between h-24 md:h-28">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium text-sm md:text-base leading-tight">Free DP</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Text & Features */}
                    <div>
                        {/* Discover Badge & Countdown */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm self-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                <span className="text-xs font-semibold text-gray-600">Discover Best Promo</span>
                            </div>

                            {/* Countdown Timer */}
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider animate-pulse">Berakhir Dalam:</span>
                                <div className="flex gap-1.5">
                                    {[
                                        { label: 'Jam', val: time.h },
                                        { label: 'Menit', val: time.m },
                                        { label: 'Detik', val: time.s }
                                    ].map((t, i) => (
                                        <div key={i} className="flex items-center gap-1">
                                            <div className="bg-gray-900 text-white min-w-[32px] h-8 flex items-center justify-center rounded-lg font-mono font-bold text-sm shadow-sm">
                                                {t.val}
                                            </div>
                                            {i < 2 && <span className="text-gray-400 font-bold">:</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                            Promo terbaik di bintaro jaya, hanya untuk anda!
                        </h2>

                        <div className="flex flex-wrap gap-3 mb-10">
                            {promoItems.map((item, idx) => (
                                <div key={idx} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm hover:border-blue-300 transition-colors">
                                    <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href="https://wa.me/6281808187943?text=Halo,%20saya%20tertarik%20dengan%20promo%20Siap%20Huni%20dan%20Free%20PPN%20Bintaro%20Jaya"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick('Promo Ready Section - Discover Best Promo')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Konsultasi Whatsapp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
