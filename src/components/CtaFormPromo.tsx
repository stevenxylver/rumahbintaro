'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const PROMO_IMAGES = [
    '/images/promo/promolebaran.png',
    '/images/promo/promoimlek.png',
]

export function Ctaformpromo() {
    const [slide, setSlide] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            setSlide(prev => (prev + 1) % PROMO_IMAGES.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

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
        } catch {
            setError('Gagal mengirim. Coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-5xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur border border-white/30 text-white text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                        Penawaran Eksklusif
                    </span>
                    <h2 className="text-4xl font-extrabold text-white drop-shadow-sm">
                        Dapatkan Promo Menarik 🎁
                    </h2>
                    <p className="text-blue-100 mt-3 text-sm max-w-md mx-auto">
                        Isi data Anda dan tim kami akan segera menghubungi untuk memberikan penawaran terbaik.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                    {/* Left — Slideshow */}
                    <div className="relative w-full md:w-5/12 h-72 md:h-auto min-h-[380px] rounded-t-3xl md:rounded-t-none md:rounded-l-3xl overflow-hidden">
                        {PROMO_IMAGES.map((src, i) => (
                            <div
                                key={src}
                                className="absolute inset-0 transition-opacity duration-700"
                                style={{ opacity: i === slide ? 1 : 0 }}
                            >
                                <Image src={src} alt={`Promo ${i + 1}`} fill className="object-cover md:object-contain" />
                            </div>
                        ))}
                        {/* Dot indicators */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                            {PROMO_IMAGES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSlide(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === slide ? 'bg-blue-600 w-5' : 'bg-gray-300 w-2'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                        {success ? (
                            <div className="text-center py-10">
                                <div className="text-7xl mb-5">🎉</div>
                                <h3 className="text-2xl font-bold text-white mb-2">Terima Kasih!</h3>
                                <p className="text-blue-100 text-sm">Tim kami akan segera menghubungi Anda.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-white mb-1">Konsultasi Gratis</h3>
                                <p className="text-blue-200 text-sm mb-6">Isi formulir di bawah untuk mendapatkan info properti terbaik.</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text" value={name} onChange={e => setName(e.target.value)}
                                            placeholder="Nama Lengkap"
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                                        />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                                            placeholder="Email"
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                                        />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                                            placeholder="Nomor WhatsApp"
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                                        />
                                    </div>
                                    {error && <p className="text-red-300 text-xs">{error}</p>}
                                    <button
                                        type="submit" disabled={loading}
                                        className="w-full py-3.5 bg-white hover:bg-blue-50 text-blue-700 font-bold rounded-xl shadow-lg transition-all disabled:opacity-60 text-sm flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>Kirim Sekarang <span>→</span></>
                                        )}
                                    </button>
                                </form>

                                {/* Trust badges */}
                                <div className="flex items-center gap-4 mt-6 text-blue-200 text-xs">
                                    <span className="flex items-center gap-1">🔒 Data aman & terjaga</span>
                                    <span className="flex items-center gap-1">⚡ Respon cepat</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
