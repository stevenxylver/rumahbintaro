'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Facility {
    title: string
    image: string
    category: string
    images?: string[]
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

const ITEMS_PER_PAGE_MOBILE = 6 // 3 rows x 2 cols
const ITEMS_PER_PAGE_DESKTOP = 10

interface FacilitiesSectionProps {
    facilities?: Facility[]
}

export function FacilitiesSection({ facilities = [] }: FacilitiesSectionProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [mobilePage, setMobilePage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState('semua')

    // Filter facilities by category
    const filteredFacilities = selectedCategory === 'semua'
        ? facilities
        : facilities.filter(f => f.category === selectedCategory)

    const totalPagesDesktop = Math.ceil(filteredFacilities.length / ITEMS_PER_PAGE_DESKTOP)
    const totalPagesMobile = Math.ceil(filteredFacilities.length / ITEMS_PER_PAGE_MOBILE)

    const desktopStart = (currentPage - 1) * ITEMS_PER_PAGE_DESKTOP
    const currentFacilitiesDesktop = filteredFacilities.slice(desktopStart, desktopStart + ITEMS_PER_PAGE_DESKTOP)

    const mobileStart = (mobilePage - 1) * ITEMS_PER_PAGE_MOBILE
    const currentFacilitiesMobile = filteredFacilities.slice(mobileStart, mobileStart + ITEMS_PER_PAGE_MOBILE)

    // Reset pages when category changes
    useEffect(() => {
        setCurrentPage(1)
        setMobilePage(1)
    }, [selectedCategory])

    // Lightbox State
    const [activeFacility, setActiveFacility] = useState<Facility | null>(null)
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)

    const handleFacilityClick = (facility: Facility) => {
        if (facility.images && facility.images.length > 0) {
            setActiveFacility(facility)
            setCurrentGalleryIndex(0)
        }
    }

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (activeFacility?.images) {
            setCurrentGalleryIndex(prev => (prev + 1) % activeFacility.images!.length)
        }
    }

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (activeFacility?.images) {
            setCurrentGalleryIndex(prev => (prev - 1 + activeFacility.images!.length) % activeFacility.images!.length)
        }
    }

    return (
        <section className="pt-8 pb-8 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-4 md:mb-12">
                    <div className="flex flex-wrap justify-center gap-x-4 md:block">
                        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 whitespace-nowrap">
                            Fasilitas Lengkap
                        </h2>
                        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
                            <span className="text-blue-600">Di Sekitar</span>{' '}
                            <span className="text-gray-900">Anda</span>
                        </h2>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-visible gap-2 mb-12 pb-2 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                        {/* ── MOBILE: 2 cols x 3 rows grid with slider ── */}
                        <div className="md:hidden">
                            <div className="grid grid-cols-2 gap-4">
                                {currentFacilitiesMobile.map((facility, index) => (
                                    <div
                                        key={`${facility.title}-${index}`}
                                        onClick={() => handleFacilityClick(facility)}
                                        className={`group relative aspect-square rounded-2xl overflow-hidden ${facility.images && facility.images.length > 0 ? 'cursor-pointer' : ''}`}
                                    >
                                        <Image
                                            src={facility.image}
                                            alt={facility.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        <div className="absolute top-2 left-2">
                                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] rounded-full">
                                                {categories.find(c => c.id === facility.category)?.icon}
                                            </span>
                                        </div>
                                        {facility.images && facility.images.length > 0 && (
                                            <div className="absolute top-2 right-2">
                                                <span className="px-2 py-1 bg-blue-600 text-white text-[8px] rounded-full flex items-center gap-1 font-bold">
                                                    📷 {facility.images.length}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-end justify-center p-2">
                                            <h3 className="text-white font-bold text-xs text-center">
                                                {facility.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Slider Controls */}
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

                        {/* ── DESKTOP: grid + pagination ── */}
                        <div className="hidden md:block">
                            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                                {currentFacilitiesDesktop.map((facility, index) => (
                                    <div
                                        key={`${facility.title}-${index}`}
                                        onClick={() => handleFacilityClick(facility)}
                                        className={`group relative aspect-square rounded-2xl overflow-hidden ${facility.images && facility.images.length > 0 ? 'cursor-zoom-in' : ''}`}
                                    >
                                        <Image
                                            src={facility.image}
                                            alt={facility.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity group-hover:opacity-80" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                                {categories.find(c => c.id === facility.category)?.icon}
                                            </span>
                                        </div>
                                        {facility.images && facility.images.length > 0 && (
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 bg-blue-600/90 backdrop-blur text-white text-xs rounded-full flex items-center gap-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                    📷 View Gallery ({facility.images.length})
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-end justify-center p-4">
                                            <h3 className="text-white font-bold text-sm md:text-base lg:text-lg text-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                                {facility.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Pagination */}
                            {totalPagesDesktop > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    {Array.from({ length: totalPagesDesktop }, (_, i) => i + 1).map(page => (
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
                                        onClick={() => setCurrentPage(prev => Math.min(totalPagesDesktop, prev + 1))}
                                        disabled={currentPage === totalPagesDesktop}
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Gallery Lightbox */}
            {activeFacility && activeFacility.images && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                    onClick={() => setActiveFacility(null)}
                >
                    <button 
                        onClick={() => setActiveFacility(null)}
                        className="absolute top-6 right-6 text-white hover:rotate-90 transition-all z-[110]"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div 
                        className="relative w-full max-w-5xl aspect-video"
                        onClick={e => e.stopPropagation()}
                    >
                        <Image
                            src={activeFacility.images[currentGalleryIndex]}
                            alt={activeFacility.title}
                            fill
                            className="object-contain"
                            priority
                        />

                        {activeFacility.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                                    {activeFacility.images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentGalleryIndex(i)}
                                            className={`h-1.5 transition-all rounded-full ${i === currentGalleryIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                        
                        <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
                            <p className="text-white font-bold">{activeFacility.title}</p>
                            <p className="text-white/60 text-sm">Image {currentGalleryIndex + 1} of {activeFacility.images.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
