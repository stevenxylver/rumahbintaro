'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { trackPromoView } from '@/lib/gtag'

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
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (open) {
            setSlide(0)
            // Trigger entrance animation
            requestAnimationFrame(() => setIsVisible(true))
        } else {
            setIsVisible(false)
        }
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
        trackPromoView('Popup Image Overlay')
        router.push('/#promo-form')
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop with animation */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                style={{ opacity: isVisible ? 1 : 0 }}
            />

            {/* Popup container */}
            <div
                className="relative w-full max-w-xs md:max-w-sm transition-all duration-300"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close button — overlapping top-right corner */}
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 z-20 w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-red-500 hover:text-white hover:rotate-90 transition-all duration-300"
                    aria-label="Tutup"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image poster */}
                <button
                    onClick={handleClick}
                    className="relative w-full cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-transparent"
                    style={{ aspectRatio: '2/3' }}
                    aria-label="Lihat Promo"
                >
                    {PROMO_IMAGES.map((src, i) => (
                        <div
                            key={src}
                            className="absolute inset-0 transition-opacity duration-700"
                            style={{ opacity: i === slide ? 1 : 0 }}
                        >
                            <Image src={src} alt={`Promo ${i + 1}`} fill className="object-contain" />
                        </div>
                    ))}
                </button>

                {/* Dot indicators */}
                {PROMO_IMAGES.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                        {PROMO_IMAGES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSlide(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === slide
                                    ? 'bg-white w-6'
                                    : 'bg-white/40 w-2 hover:bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
