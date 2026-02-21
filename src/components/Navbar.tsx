'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-md'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">R</span>
                        </div>
                        <span className="font-bold text-xl text-gray-800">Rumah Bintaro</span>
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
                        <a
                            href="https://wa.me/6281808187943?text=Halo, saya tertarik dengan properti di Rumah Bintaro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                        >
                            Hubungi Kami
                        </a>
                    </div>

                    {/* Mobile Burger Button */}
                    <button
                        onClick={() => setMenuOpen(prev => !prev)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            // X icon
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger icon
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg px-4 py-4 flex flex-col gap-4">
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100 transition-colors"
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/properties"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100 transition-colors"
                    >
                        Properti
                    </Link>
                    <Link
                        href="/kavling"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100 transition-colors"
                    >
                        Kavling
                    </Link>
                    <Link
                        href="/kpr-calculator"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100 transition-colors"
                    >
                        Kalkulator KPR
                    </Link>
                    <a
                        href="https://wa.me/6281808187943?text=Halo, saya tertarik dengan properti di Rumah Bintaro"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className="w-full text-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
                    >
                        Hubungi Kami
                    </a>
                </div>
            )}
        </nav>
    )
}
