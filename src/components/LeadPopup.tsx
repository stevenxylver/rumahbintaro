'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const PROMO_IMAGES = [
    '/images/promo/promolebaran.png',
    '/images/promo/promoimlek.png',
]

interface LeadPopupProps {
    open: boolean
    onClose: () => void
}

export function LeadPopup({ open, onClose }: LeadPopupProps) {
    const [slide, setSlide] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if (open) setSlide(0)
    }, [open])

    useEffect(() => {
        if (!open) return
        const interval = setInterval(() => {
            setSlide(prev => (prev + 1) % PROMO_IMAGES.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [open])

    if (!open) return null

    const handleClick = () => {
        onClose()
        router.push('/#promo-form')
    }

    return (
        /* Backdrop — klik di luar untuk close */
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Inner card — stop propagation agar klik di dalam tidak menutup */}
            <div
                className="relative w-full max-w-sm md:max-w-md"
                onClick={e => e.stopPropagation()}
            >
                {/* Close button — lebih besar & kontras */}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 z-20 w-10 h-10 rounded-full bg-white shadow-xl text-gray-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200 border border-gray-200"
                    aria-label="Tutup"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Clickable image */}
                <button
                    onClick={handleClick}
                    className="relative w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                    style={{ aspectRatio: '3/4' }}
                    aria-label="Lihat Promo"
                >
                    {PROMO_IMAGES.map((src, i) => (
                        <div
                            key={src}
                            className="absolute inset-0 transition-opacity duration-700"
                            style={{ opacity: i === slide ? 1 : 0 }}
                        >
                            <Image src={src} alt={`Promo ${i + 1}`} fill className="object-contain bg-white" />
                        </div>
                    ))}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-6">
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg">
                            Lihat Penawaran →
                        </span>
                    </div>
                </button>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-3">
                    {PROMO_IMAGES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSlide(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === slide ? 'bg-white w-5' : 'bg-white/40 w-2'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
