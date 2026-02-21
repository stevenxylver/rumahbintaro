'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

interface Facility {
    title: string
    image: string
    category: string
}

const categories = [
    { id: 'semua', name: 'Semua', icon: '🏠' },
    { id: 'kesehatan', name: 'Kesehatan', icon: '🏥' },
    { id: 'edukasi', name: 'Edukasi', icon: '🎓' },
    { id: 'kantor', name: 'Kantor', icon: '🏢' },
    { id: 'hiburan', name: 'Hiburan', icon: '🎭' },
    { id: 'olahraga', name: 'Olahraga', icon: '⚽' },
    { id: 'belanja', name: 'Belanja', icon: '🛒' },
]

const facilities: Facility[] = [
    // Kesehatan
    { title: 'RS Pondok Indah', image: '/images/areas/rumahsakitpi.png', category: 'kesehatan' },
    { title: 'Klinik Medika', image: '/images/areas/klinikmedika.png', category: 'kesehatan' },
    { title: 'Apotek Kimia Farma', image: '/images/areas/kimiafarma.png', category: 'kesehatan' },

    // Edukasi
    { title: 'SD Al-Azhar', image: '/images/areas/sdaladzhar.png', category: 'edukasi' },
    { title: 'SMPK Penabur', image: '/images/areas/smpkpenabur.png', category: 'edukasi' },
    { title: 'SMA Labschool', image: '/images/areas/labschool.png', category: 'edukasi' },
    { title: 'Universitas Bina Nusantara', image: '/images/areas/binus.png', category: 'edukasi' },

    // Kantor
    { title: 'Bintaro Trade Center', image: '/images/areas/bintarotradecenter.png', category: 'kantor' },
    { title: 'CBD Bintaro Jaya', image: '/images/areas/rumahsakit.png', category: 'kantor' },
    { title: 'Perkantoran Sector 7', image: '/images/areas/rumahsakit.png', category: 'kantor' },

    // Hiburan
    { title: 'XXI Bintaro Plaza', image: '/images/areas/bintaroxchange.png', category: 'hiburan' },
    { title: 'Timezone', image: '/images/areas/rumahsakit.png', category: 'hiburan' },
    { title: 'Taman Kota', image: '/images/areas/rumahsakit.png', category: 'hiburan' },

    // Olahraga
    { title: 'Lapangan Golf BSD', image: '/images/areas/rumahsakit.png', category: 'olahraga' },
    { title: 'GOR Bintaro', image: '/images/areas/rumahsakit.png', category: 'olahraga' },
    { title: 'Kolam Renang Bintaro', image: '/images/areas/rumahsakit.png', category: 'olahraga' },
    { title: 'Fitness Center', image: '/images/areas/rumahsakit.png', category: 'olahraga' },

    // Belanja
    { title: 'Bintaro Jaya Xchange', image: '/images/areas/bintaroxchange.png', category: 'belanja' },
    { title: 'Lotte Mart', image: '/images/areas/lottemart.png', category: 'belanja' },
    { title: 'Giant Supermarket', image: '/images/areas/rumahsakit.png', category: 'belanja' },
]

const ITEMS_PER_PAGE = 10

export function FacilitiesSection() {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState('semua')
    const [mobileSlide, setMobileSlide] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)

    // Filter facilities by category
    const filteredFacilities = selectedCategory === 'semua'
        ? facilities
        : facilities.filter(f => f.category === selectedCategory)

    const totalPages = Math.ceil(filteredFacilities.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentFacilities = filteredFacilities.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    const mobileFacility = filteredFacilities[mobileSlide] ?? filteredFacilities[0]

    // Reset pages when category changes
    useEffect(() => {
        setCurrentPage(1)
        setMobileSlide(0)
    }, [selectedCategory])

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
                style={{ transform: `translateY(${Math.max(0, 50 - scrollProgress * 50)}px)` }}
            >
                {/* Section Title */}
                <div
                    className="text-center mb-12"
                    style={{
                        transform: `translateY(${Math.max(0, 30 - scrollProgress * 60)}px)`,
                        opacity: Math.min(1, scrollProgress * 1.5)
                    }}
                >
                    <h2
                        className="text-xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        Fasilitas Lengkap
                    </h2>
                    <h2
                        className="text-xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300"
                        style={{ color: textColor }}
                    >
                        <span style={{ color: scrollProgress > 0.5 ? '#2563eb' : `rgb(${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))}, ${Math.round(180 - (scrollProgress * 100))})` }}>Di Sekitar</span> Anda
                    </h2>
                </div>

                {/* Category Filter — scrollable single row on mobile, wrap on desktop */}
                <div className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-visible gap-2 mb-10 pb-2 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex-shrink-0 md:flex-shrink px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${selectedCategory === category.id
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {filteredFacilities.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        Tidak ada fasilitas dalam kategori ini
                    </div>
                ) : (
                    <>
                        {/* ── MOBILE: single-item slider ── */}
                        <div className="md:hidden">
                            <div className="relative">
                                <div className="relative aspect-square rounded-2xl overflow-hidden">
                                    <Image
                                        src={mobileFacility.image}
                                        alt={mobileFacility.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                            {categories.find(c => c.id === mobileFacility.category)?.icon}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 flex items-end p-4">
                                        <h3 className="text-white font-bold text-base">{mobileFacility.title}</h3>
                                    </div>
                                </div>

                                {/* Prev arrow */}
                                <button
                                    onClick={() => setMobileSlide(prev => Math.max(0, prev - 1))}
                                    disabled={mobileSlide === 0}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md disabled:opacity-30 transition-all"
                                >
                                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Next arrow */}
                                <button
                                    onClick={() => setMobileSlide(prev => Math.min(filteredFacilities.length - 1, prev + 1))}
                                    disabled={mobileSlide === filteredFacilities.length - 1}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md disabled:opacity-30 transition-all"
                                >
                                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Dot indicators */}
                            <div className="flex justify-center gap-1.5 mt-4">
                                {filteredFacilities.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setMobileSlide(i)}
                                        className={`rounded-full transition-all duration-200 ${i === mobileSlide
                                            ? 'w-5 h-2 bg-blue-600'
                                            : 'w-2 h-2 bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* ── DESKTOP: grid + pagination ── */}
                        <div className="hidden md:block">
                            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                                {currentFacilities.map((facility, index) => (
                                    <div
                                        key={`${facility.title}-${index}`}
                                        className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                                        style={{
                                            opacity: Math.min(1, scrollProgress * 2 - (index * 0.05)),
                                            transform: `translateY(${Math.max(0, 20 - scrollProgress * 40)}px)`
                                        }}
                                    >
                                        <Image
                                            src={facility.image}
                                            alt={facility.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                                {categories.find(c => c.id === facility.category)?.icon}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 flex items-end p-3">
                                            <h3 className="text-white font-bold text-sm md:text-base lg:text-lg">
                                                {facility.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-10">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-full font-medium transition-all ${currentPage === page
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
