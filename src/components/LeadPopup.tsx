'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { trackPromoView } from '@/lib/gtag'
import { getPromos } from '@/lib/actions/promo'

interface PromoData {
    id: string;
    image: string;
    title: string | null;
}

interface LeadPopupProps {
    open: boolean
    onClose: () => void
}

export function LeadPopup({ open, onClose }: LeadPopupProps) {
    const [promos, setPromos] = useState<PromoData[]>([])
    const [slide, setSlide] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        async function loadPromos() {
            const data = await getPromos()
            setPromos(data as PromoData[])
        }
        loadPromos()
    }, [])

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
        if (!open || promos.length === 0) return
        const interval = setInterval(() => {
            setSlide(prev => (prev + 1) % promos.length)
        }, 4000) // Slightly longer interval for better readability
        return () => clearInterval(interval)
    }, [open, promos.length])

    if (!open || pathname?.startsWith('/admin') || promos.length === 0) return null

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
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
                style={{ opacity: isVisible ? 1 : 0 }}
            />

            {/* Popup container */}
            <div
                className="relative w-[90vw] max-w-[400px] transition-all duration-500 ease-out"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 z-20 w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-2xl hover:bg-red-500 hover:text-white hover:rotate-90 transition-all duration-300 group"
                    aria-label="Tutup"
                >
                    <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image poster */}
                <button
                    onClick={handleClick}
                    className="relative w-full cursor-pointer shadow-[0_30px_100px_rgba(0,0,0,0.6)] bg-white rounded-3xl overflow-hidden group/img"
                    style={{ aspectRatio: '4/6' }}
                    aria-label="Lihat Promo"
                >
                    {promos.map((promo, i) => (
                        <div
                            key={promo.id}
                            className="absolute inset-0 transition-all duration-1000 ease-in-out"
                            style={{
                                opacity: i === slide ? 1 : 0,
                                transform: i === slide ? 'scale(1)' : 'scale(1.05)'
                            }}
                        >
                            <Image
                                src={promo.image}
                                alt={promo.title || `Promo ${i + 1}`}
                                fill
                                className="object-cover group-hover/img:scale-105 transition-transform duration-700"
                                priority={i === 0}
                            />
                            {/* Subtle Overlay for title if needed */}

                        </div>
                    ))}
                </button>

                {/* Dot indicators */}
                {promos.length > 1 && (
                    <div className="flex justify-center gap-3 mt-6">
                        {promos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSlide(i)}
                                className={`h-2.5 rounded-full transition-all duration-500 ${i === slide
                                    ? 'bg-white w-10 shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                                    : 'bg-white/30 w-2.5 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
