'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Area, Product } from '@/data/areas'

interface Props {
    area: Area
}

export function PropertyDetailClient({ area }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product>(area.products[0])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [showAllFeatures, setShowAllFeatures] = useState(false)
    const [isContactFormOpen, setIsContactFormOpen] = useState(false)
    const [contactName, setContactName] = useState('')
    const [contactPhone, setContactPhone] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)

    // Use area image as fallback if product has no images
    const displayImages = selectedProduct.images.length > 0
        ? selectedProduct.images
        : [area.image]

    return (
        <>
            <div className="min-h-screen bg-white pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500">
                            <li>
                                <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
                            </li>
                            <li className="text-gray-400">/</li>
                            <li>
                                <Link href="/properties" className="hover:text-blue-600 transition-colors">Properti</Link>
                            </li>
                            <li className="text-gray-400">/</li>
                            <li className="text-gray-900 font-medium">{area.name}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Main Image */}
                            <div
                                className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-4 bg-gray-100 cursor-pointer"
                                onClick={() => setIsLightboxOpen(true)}
                            >
                                <Image
                                    src={displayImages[currentImageIndex]}
                                    alt={`${area.name} - ${selectedProduct.type}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                    priority
                                />
                                {/* Hot Badge */}
                                {area.hot && (
                                    <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                                        🔥 HOT
                                    </div>
                                )}
                                {/* Click to zoom hint */}
                                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                    Klik untuk perbesar
                                </div>
                                {/* Image Navigation */}
                                {displayImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setCurrentImageIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1)
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition"
                                        >
                                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setCurrentImageIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1)
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition"
                                        >
                                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                                {/* Image Counter */}
                                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                                    {currentImageIndex + 1} / {displayImages.length}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {displayImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-2 mb-6">
                                    {displayImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`relative h-20 rounded-lg overflow-hidden transition ${currentImageIndex === idx
                                                ? 'ring-2 ring-blue-600'
                                                : 'opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{area.name}</h1>
                            <p className="text-xl text-blue-600 font-semibold mb-6">{selectedProduct.type}</p>

                            {/* Features Grid */}
                            {(() => {
                                const allFeatures = [
                                    { icon: '🛏️', value: String(selectedProduct.bedrooms), label: 'Kamar Tidur' },
                                    { icon: '🚿', value: String(selectedProduct.bathrooms), label: 'Kamar Mandi' },
                                    { icon: '🍳', value: String(selectedProduct.kitchen), label: 'Dapur' },
                                    { icon: '🛋️', value: String(selectedProduct.livingRoom), label: 'Ruang Tamu' },
                                    { icon: '🚗', value: String(selectedProduct.carPack), label: 'Car Park' },
                                    { icon: '🌿', value: String(selectedProduct.terraceGarden), label: 'Teras/Taman' },
                                    ...(selectedProduct.ensuiteMasterBedroom ? [{ icon: '🛏️', value: String(selectedProduct.ensuiteMasterBedroom), label: 'Ensuite Master Bedroom' }] : []),
                                    ...(selectedProduct.powderRoom ? [{ icon: '🪞', value: String(selectedProduct.powderRoom), label: 'Powder Room' }] : []),
                                    ...(selectedProduct.sideYard ? [{ icon: '🌳', value: String(selectedProduct.sideYard), label: 'Side Yard' }] : []),
                                    ...(selectedProduct.guestLounge ? [{ icon: '🪑', value: String(selectedProduct.guestLounge), label: 'Guest Lounge' }] : []),
                                    ...(selectedProduct.laundryArea ? [{ icon: '🧺', value: String(selectedProduct.laundryArea), label: 'Laundry Area' }] : []),
                                    ...(selectedProduct.diningRoom ? [{ icon: '🍽️', value: String(selectedProduct.diningRoom), label: 'Dining Room' }] : []),
                                    ...(selectedProduct.maidRoomBathroom ? [{ icon: '🏠', value: String(selectedProduct.maidRoomBathroom), label: 'Maid Room & Bathroom' }] : []),
                                    ...(selectedProduct.workingArea ? [{ icon: '💼', value: String(selectedProduct.workingArea), label: 'Working Area' }] : []),
                                    ...(selectedProduct.carCharger ? [{ icon: '🔌', value: String(selectedProduct.carCharger), label: 'Car Charger System' }] : []),
                                    ...(selectedProduct.smartDoorLock ? [{ icon: '🔐', value: String(selectedProduct.smartDoorLock), label: 'Smart Door Lock' }] : []),
                                    ...(selectedProduct.wallPad ? [{ icon: '📱', value: String(selectedProduct.wallPad), label: 'Wall Pad Security' }] : []),
                                    ...(selectedProduct.pantryArea ? [{ icon: '🍶', value: String(selectedProduct.pantryArea), label: 'Pantry Area' }] : []),
                                ].filter(f => f.value !== '0')
                                const displayedFeatures = showAllFeatures ? allFeatures : allFeatures.slice(0, 6)
                                const hasMore = allFeatures.length > 6

                                return (
                                    <>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                            {displayedFeatures.map((feature, idx) => (
                                                <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center">
                                                    <div className="text-3xl mb-2">{feature.icon}</div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {feature.value}
                                                    </div>
                                                    <div className="text-gray-500 text-sm">{feature.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                        {hasMore && (
                                            <button
                                                onClick={() => setShowAllFeatures(!showAllFeatures)}
                                                className="w-full mb-8 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-600 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                                            >
                                                {showAllFeatures ? 'Tampilkan Lebih Sedikit' : `Lihat Semua Fitur (${allFeatures.length})`}
                                                <svg className={`w-4 h-4 transition-transform ${showAllFeatures ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        )}
                                    </>
                                )
                            })()}

                            {/* Description */}
                            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang Properti</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {area.name} adalah hunian modern dengan desain arsitektur kontemporer yang menawarkan kenyamanan dan keeleganan.
                                    Unit {selectedProduct.type} memiliki {selectedProduct.bedrooms} kamar tidur dan {selectedProduct.bathrooms} kamar mandi,
                                    cocok untuk keluarga kecil hingga menengah. Dilengkapi dengan area parkir untuk {selectedProduct.carPack} mobil
                                    {selectedProduct.terraceGarden ? ' serta teras dan taman yang asri.' : '.'}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                                {/* Type Selector */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Pilih Tipe Unit</h3>
                                    <div className="space-y-2">
                                        {area.products.map((product, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setSelectedProduct(product)
                                                    setCurrentImageIndex(0)
                                                }}
                                                className={`w-full p-4 rounded-xl text-left transition-all ${selectedProduct.type === product.type
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                                    : 'bg-white border border-gray-200 text-gray-900 hover:border-blue-400'
                                                    }`}
                                            >
                                                <div className="font-bold">{product.type}</div>
                                                <div className={`text-sm ${selectedProduct.type === product.type ? 'text-white/80' : 'text-gray-500'}`}>
                                                    {product.bedrooms} KT • {product.bathrooms} KM • {product.carPack} Parkir
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Specifications Summary */}
                                <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
                                    <h4 className="font-bold text-gray-900 mb-3">Spesifikasi</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Tipe</span>
                                            <span className="font-medium">{selectedProduct.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Kamar Tidur</span>
                                            <span className="font-medium">{selectedProduct.bedrooms}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Kamar Mandi</span>
                                            <span className="font-medium">{selectedProduct.bathrooms}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Dapur</span>
                                            <span className="font-medium">{selectedProduct.kitchen}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Ruang Tamu</span>
                                            <span className="font-medium">{selectedProduct.livingRoom}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Car Park</span>
                                            <span className="font-medium">{selectedProduct.carPack}</span>
                                        </div>
                                        {selectedProduct.terraceGarden ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Teras/Taman</span>
                                                <span className="font-medium">{selectedProduct.terraceGarden}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.ensuiteMasterBedroom ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Ensuite Master</span>
                                                <span className="font-medium">{selectedProduct.ensuiteMasterBedroom}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.powderRoom ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Powder Room</span>
                                                <span className="font-medium">{selectedProduct.powderRoom}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.sideYard ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Side Yard</span>
                                                <span className="font-medium">{selectedProduct.sideYard}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.guestLounge ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Guest Lounge</span>
                                                <span className="font-medium">{selectedProduct.guestLounge}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.laundryArea ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Laundry Area</span>
                                                <span className="font-medium">{selectedProduct.laundryArea}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.diningRoom ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Dining Room</span>
                                                <span className="font-medium">{selectedProduct.diningRoom}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.maidRoomBathroom ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Maid Room & Bath</span>
                                                <span className="font-medium">{selectedProduct.maidRoomBathroom}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.workingArea ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Working Area</span>
                                                <span className="font-medium">{selectedProduct.workingArea}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.carCharger ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Car Charger</span>
                                                <span className="font-medium">{selectedProduct.carCharger}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.smartDoorLock ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Smart Door Lock</span>
                                                <span className="font-medium">{selectedProduct.smartDoorLock}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.wallPad ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Wall Pad Security</span>
                                                <span className="font-medium">{selectedProduct.wallPad}</span>
                                            </div>
                                        ) : null}
                                        {selectedProduct.pantryArea ? (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Pantry Area</span>
                                                <span className="font-medium">{selectedProduct.pantryArea}</span>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                {/* Contact Buttons */}
                                <div className="space-y-3">
                                    <a
                                        href={`https://wa.me/6281808187943?text=Halo, saya tertarik dengan properti ${area.name} - ${selectedProduct.type}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Hubungi via WhatsApp
                                    </a>
                                    <button
                                        onClick={() => { setIsContactFormOpen(true); setFormSubmitted(false); setContactName(''); setContactPhone(''); }}
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-300 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Hubungi Kami
                                    </button>
                                </div>

                                {/* Back Link */}
                                <Link
                                    href="/properties"
                                    className="mt-6 flex items-center justify-center gap-2 w-full py-3 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali ke Daftar Properti
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Modal */}
            {isContactFormOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setIsContactFormOpen(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsContactFormOpen(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {!formSubmitted ? (
                            <>
                                {/* Header */}
                                <div className="text-center mb-6">
                                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Hubungi Kami</h3>
                                    <p className="text-gray-500 text-sm mt-1">Isi data Anda, kami akan segera menghubungi</p>
                                </div>

                                {/* Property Info Badge */}
                                <div className="bg-gray-50 rounded-xl p-3 mb-5 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        🏠
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{area.name}</p>
                                        <p className="text-gray-500 text-xs">{selectedProduct.type}</p>
                                    </div>
                                </div>

                                {/* Form */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        if (!contactName.trim() || !contactPhone.trim()) return
                                        const subject = `Inquiry Properti ${area.name} - ${selectedProduct.type}`
                                        const body = `Nama: ${contactName}\nNo. Telepon: ${contactPhone}\n\nSaya tertarik dengan properti ${area.name} - ${selectedProduct.type}. Mohon informasi lebih lanjut.`
                                        window.location.href = `mailto:stevmili123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                                        setFormSubmitted(true)
                                    }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={contactName}
                                            onChange={(e) => setContactName(e.target.value)}
                                            placeholder="Masukkan nama Anda"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor Telepon</label>
                                        <input
                                            type="tel"
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                            placeholder="08xxxxxxxxxx"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Kirim via Email
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* Success State */
                            <div className="text-center py-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Terima Kasih!</h3>
                                <p className="text-gray-500 text-sm mb-6">Data Anda telah dikirim. Tim kami akan segera menghubungi Anda.</p>
                                <button
                                    onClick={() => setIsContactFormOpen(false)}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                                >
                                    Tutup
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

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
                        className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={displayImages[currentImageIndex]}
                            alt={`${area.name} - ${selectedProduct.type}`}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Navigation Buttons */}
                    {displayImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentImageIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1)
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentImageIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1)
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Thumbnails */}
                    {displayImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {displayImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentImageIndex(idx)
                                    }}
                                    className={`relative w-16 h-12 rounded-lg overflow-hidden transition ${currentImageIndex === idx
                                        ? 'ring-2 ring-white'
                                        : 'opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
