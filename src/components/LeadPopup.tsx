'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    // Reset form when opened
    useEffect(() => {
        if (open) {
            setSuccess(false)
            setName('')
            setEmail('')
            setPhone('')
            setError('')
            setSlide(0)
        }
    }, [open])

    // Auto-slide every 3s when open
    useEffect(() => {
        if (!open) return
        const interval = setInterval(() => {
            setSlide(prev => (prev + 1) % PROMO_IMAGES.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/send-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone }),
            })
            if (!res.ok) throw new Error('Gagal')
            setSuccess(true)
            setTimeout(() => onClose(), 3000)
        } catch {
            setError('Gagal mengirim. Coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    if (!open) return null

    const Slideshow = ({ height }: { height: string }) => (
        <div className={`relative w-full bg-white overflow-hidden ${height}`}>
            {PROMO_IMAGES.map((src, i) => (
                <div
                    key={src}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === slide ? 1 : 0 }}
                >
                    <Image src={src} alt={`Promo ${i + 1}`} fill className="object-contain" />
                </div>
            ))}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                {PROMO_IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setSlide(i)}
                        className={`h-2 rounded-full transition-all ${i === slide ? 'bg-blue-600 w-4' : 'bg-gray-300 w-2'}`}
                    />
                ))}
            </div>
        </div>
    )

    const CloseBtn = ({ className }: { className: string }) => (
        <button onClick={onClose} className={className} aria-label="Tutup">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    )

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

            {/* ── MOBILE ── */}
            <div className="md:hidden relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl">
                <CloseBtn className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center" />
                <Slideshow height="h-[260px]" />
                {success ? (
                    <div className="text-center py-8 px-6">
                        <div className="text-5xl mb-3">🎉</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Terima Kasih!</h3>
                        <p className="text-gray-500 text-sm">Tim kami akan segera menghubungi Anda.</p>
                    </div>
                ) : (
                    <div className="px-6 py-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Dapatkan Promo Menarik 🎁</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Nama Lengkap"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Nomor WhatsApp"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            {error && <p className="text-red-500 text-xs">{error}</p>}
                            <button type="submit" disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md transition-all disabled:opacity-60">
                                {loading ? 'Mengirim...' : 'Kirim Sekarang →'}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* ── DESKTOP ── */}
            <div className="hidden md:flex relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl">
                <CloseBtn className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/20 backdrop-blur text-white flex items-center justify-center hover:bg-black/40 transition" />
                <div className="w-1/2 min-h-[420px]">
                    <Slideshow height="h-full min-h-[420px]" />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="text-5xl mb-4">🎉</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Terima Kasih!</h3>
                            <p className="text-gray-500 text-sm">Tim kami akan segera menghubungi Anda.</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Dapatkan Promo Menarik 🎁</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                    <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Budi Santoso"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email@anda.com"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon / WhatsApp</label>
                                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="08xx-xxxx-xxxx"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <button type="submit" disabled={loading}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all disabled:opacity-60">
                                    {loading ? 'Mengirim...' : 'Kirim Sekarang →'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>

        </div>
    )
}
