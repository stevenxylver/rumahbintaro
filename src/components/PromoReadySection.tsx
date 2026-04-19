'use client'

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

export function PromoReadySection() {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Unit <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Siap Huni</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                        Banyak keuntungan spesial untuk Anda! Nikmati promo melimpah untuk hunian impian yang sudah siap ditempati sekarang juga.
                    </p>
                </div>

                {/* Benefits List */}
                <div className="mb-20">
                    {/* Desktop: 3 Column Grid */}
                    <div className="hidden md:grid grid-cols-3 gap-6">
                        {BENEFITS.map((item, idx) => (
                            <div 
                                key={idx}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex items-start gap-4"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg tracking-tight pt-2">
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Mobile: Full Width Horizontal Slider */}
                    <div className="md:hidden relative group">
                        <div className="flex gap-4 overflow-x-auto pb-10 px-4 snap-x no-scrollbar">
                            {BENEFITS.map((item, idx) => (
                                <div 
                                    key={idx}
                                    className="min-w-[70%] sm:min-w-[50%] snap-center bg-white p-6 rounded-2xl border border-gray-100 shadow-md transition-transform"
                                >
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-xs mt-2 font-medium bg-blue-50 inline-block px-2 py-1 rounded-md">
                                        Keuntungan Spesial
                                    </p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Swipe Indicator */}
                        <div className="flex justify-center gap-1.5 -mt-4">
                            <div className="w-10 h-1 bg-blue-600 rounded-full" />
                            <div className="w-1.5 h-1 bg-gray-300 rounded-full" />
                            <div className="w-1.5 h-1 bg-gray-300 rounded-full" />
                        </div>
                        <p className="text-center text-gray-400 text-xs mt-4 animate-pulse">
                            Geser ke samping untuk melihat semua promo ➜
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center px-4">
                    <a
                        href="https://wa.me/6281808187943?text=Halo, saya ingin konsultasi mengenai promo Unit Siap Huni di Rumah Bintaro"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick('Promo Siap Huni Section')}
                        className="group relative inline-flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95"
                    >
                        <span>Konsultasi Sekarang</span>
                        <svg 
                            className="w-6 h-6 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        
                        <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>
            </div>
        </section>
    )
}
