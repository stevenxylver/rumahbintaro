'use client'

import Image from 'next/image'

// Extend to 4 items by repeating to match the requested 4-column layout
const PROMO_IMAGES = [
    '/images/promo/promolebaran.png',
    '/images/promo/promoimlek.png',
    '/images/promo/promolebaran.png',
    '/images/promo/promoimlek.png',
]

export function Ctaformpromo() {
    return (
        <section id="promo-form" className="bg-white py-16 px-4 md:px-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    Promo Terbaru
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PROMO_IMAGES.map((src, i) => (
                        <div 
                            key={i} 
                            className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-gray-50 group"
                        >
                            <Image 
                                src={src} 
                                alt={`Promo ${i + 1}`} 
                                fill 
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

