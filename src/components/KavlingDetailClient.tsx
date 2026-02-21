'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Kavling } from '@/data/kavlings'

interface Props {
    kavling: Kavling
}

export function KavlingDetailClient({ kavling }: Props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    const displayImages = kavling.images && kavling.images.length > 0
        ? kavling.images
        : [kavling.image]

    return (
        <>
            <div className="min-h-screen bg-white pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500">
                            <li>
                                <Link href="/" className="hover:text-blue-500 transition">Beranda</Link>
                            </li>
                            <li><span>/</span></li>
                            <li>
                                <Link href="/kavling" className="hover:text-blue-500 transition">Kavling</Link>
                            </li>
                            <li><span>/</span></li>
                            <li className="text-gray-900 font-medium">{kavling.name}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Images & Info */}
                        <div className="lg:col-span-2">
                            {/* Main Image */}
                            <div
                                className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 cursor-pointer group"
                                onClick={() => setIsLightboxOpen(true)}
                            >
                                <Image
                                    src={displayImages[currentImageIndex]}
                                    alt={kavling.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                                {/* Hot Badge */}
                                {kavling.hot && (
                                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                                        🔥 HOT
                                    </div>
                                )}

                                {/* Click to zoom hint */}
                                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    🔍 Klik untuk perbesar
                                </div>
                            </div>

                            {/* Thumbnail Strip */}
                            {displayImages.length > 1 && (
                                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                                    {displayImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${currentImageIndex === idx
                                                ? 'ring-2 ring-blue-500 ring-offset-2'
                                                : 'opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Kavling Title & Info */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{kavling.name}</h1>

                            {/* Key Specs */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <div className="text-3xl mb-2">📐</div>
                                    <div className="text-2xl font-bold text-gray-900">{kavling.size}</div>
                                    <div className="text-gray-500 text-sm">Luas Tanah</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <div className="text-3xl mb-2">📍</div>
                                    <div className="text-2xl font-bold text-gray-900">Bintaro</div>
                                    <div className="text-gray-500 text-sm">Lokasi</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <div className="text-3xl mb-2">📄</div>
                                    <div className="text-2xl font-bold text-gray-900">SHM</div>
                                    <div className="text-gray-500 text-sm">Sertifikat</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang Kavling</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {kavling.description || `${kavling.name} adalah tanah kavling siap bangun yang berlokasi strategis di kawasan Bintaro. Dengan luas ${kavling.size}, kavling ini cocok untuk membangun hunian impian Anda.`}
                                </p>
                            </div>

                            {/* Highlights */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Keunggulan</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        '✅ Lokasi strategis di kawasan Bintaro',
                                        '✅ Akses jalan lebar',
                                        '✅ Lingkungan aman dan nyaman',
                                        '✅ Dekat fasilitas umum',
                                        '✅ Sertifikat SHM',
                                        '✅ Siap bangun',
                                    ].map((item, idx) => (
                                        <div key={idx} className="text-gray-700 text-sm font-medium">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Info Card */}
                                <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
                                    <h4 className="font-bold text-gray-900 mb-3">Detail Kavling</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Kode Blok</span>
                                            <span className="font-medium">{kavling.kodeBlok}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Cluster</span>
                                            <span className="font-medium">{kavling.cluster}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Luas Tanah</span>
                                            <span className="font-medium">{kavling.size}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Sertifikat</span>
                                            <span className="font-medium">SHM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Status</span>
                                            <span className="font-medium text-green-600">Tersedia</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Buttons */}
                                <div className="space-y-3">
                                    <a
                                        href={`https://wa.me/6281808187943?text=Halo, saya tertarik dengan kavling ${kavling.kodeBlok} di ${kavling.cluster} (${kavling.size})`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Hubungi via WhatsApp
                                    </a>
                                    <a
                                        href="tel:+6281808187943"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-300 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Telepon
                                    </a>
                                </div>

                                {/* Back Link */}
                                <Link
                                    href="/"
                                    className="mt-6 flex items-center justify-center gap-2 w-full py-3 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition z-10"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 text-white rounded-full">
                        {currentImageIndex + 1} / {displayImages.length}
                    </div>

                    {/* Main Image */}
                    <div
                        className="relative w-full max-w-5xl aspect-[16/9] mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={displayImages[currentImageIndex]}
                            alt={kavling.name}
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Navigation */}
                    {displayImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentImageIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1)
                                }}
                                className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentImageIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1)
                                }}
                                className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Thumbnails */}
                    {displayImages.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {displayImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentImageIndex(idx)
                                    }}
                                    className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all ${currentImageIndex === idx
                                        ? 'ring-2 ring-white scale-110'
                                        : 'opacity-50 hover:opacity-80'
                                        }`}
                                >
                                    <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
