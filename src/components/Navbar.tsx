'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { LeadPopup } from '@/components/LeadPopup'
import { trackWhatsAppClick, trackPromoView } from '@/lib/gtag'

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [promoOpen, setPromoOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Auto-show popup after 2s on first load
    useEffect(() => {
        const timer = setTimeout(() => setPromoOpen(true), 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-md'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative h-10 w-10 transition-transform group-hover:scale-110 active:scale-95">
                                <Image
                                    src="/images/Jaya_log_merah.webp"
                                    alt="Bintaro Jaya Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-800 transition-colors group-hover:text-blue-600">
                                Bintaro Jaya
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">
                                Beranda
                            </Link>
                            <Link href="/properties" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">
                                Properti
                            </Link>
                            <Link href="/kavling" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">
                                Kavling
                            </Link>

                            {/* Promo Icon Button — Desktop */}
                            <button
                                onClick={() => {
                                    setPromoOpen(true);
                                    trackPromoView('Navbar Desktop');
                                }}
                                className="relative flex items-center gap-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-full font-medium transition-all group"
                                title="Lihat Promo"
                            >
                                <span className="text-lg">🎁</span>
                                <span className="text-sm font-semibold">Promo</span>
                                {/* Pulse dot */}
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                            </button>

                            <a
                                href="https://wa.me/6281808187943?text=Halo, saya tertarik dengan properti di Rumah Bintaro"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick('Navbar Desktop')}
                                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Hubungi Kami
                            </a>
                        </div>

                        {/* Mobile right side: Promo icon + Burger */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={() => {
                                    setPromoOpen(true);
                                    trackPromoView('Navbar Mobile');
                                }}
                                className="relative p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700"
                                title="Lihat Promo"
                            >
                                <span className="text-xl">🎁</span>
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                            </button>

                            <button
                                onClick={() => setMenuOpen(prev => !prev)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition"
                                aria-label="Toggle menu"
                            >
                                {menuOpen ? (
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg px-4 py-4 flex flex-col gap-4">
                        <Link href="/" onClick={() => setMenuOpen(false)}
                            className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100 transition-colors">
                            Beranda
                        </Link>
                        <Link href="/properties" onClick={() => setMenuOpen(false)}
                            className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100 transition-colors">
                            Properti
                        </Link>
                        <Link href="/kavling" onClick={() => setMenuOpen(false)}
                            className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100 transition-colors">
                            Kavling
                        </Link>

                        <a
                            href="https://wa.me/6281808187943?text=Halo, saya tertarik dengan properti di Rumah Bintaro"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                setMenuOpen(false);
                                trackWhatsAppClick('Navbar Mobile');
                            }}
                            className="w-full text-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
                        >
                            Hubungi Kami
                        </a>
                    </div>
                )}
            </nav>

            {/* Lead Popup — controlled from Navbar */}
            <LeadPopup open={promoOpen} onClose={() => setPromoOpen(false)} />
        </>
    )
}
