'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { trackLeadForm } from '@/lib/gtag'

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
            trackLeadForm('Promo Form Main');
            setSuccess(true)
        } catch {
            setError('Gagal mengirim. Coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="promo-form" className="bg-white py-12 md:py-24 px-4">
            <div className="relative max-w-5xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-[0.2em] mb-4 border border-blue-100">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        Penawaran Eksklusif
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Dapatkan Promo Menarik 🎁
                    </h2>
                    <p className="text-gray-500 mt-4 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                        Isi data Anda dan tim kami akan segera menghubungi untuk memberikan penawaran terbaik di Bintaro Jaya.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row">

                    {/* Left — Slideshow */}
                    <div className="relative w-full md:w-[45%] h-80 md:h-auto min-h-[450px] bg-gray-50 flex items-center justify-center p-6">
                        {PROMO_IMAGES.map((src, i) => (
                            <div
                                key={src}
                                className="absolute inset-0 transition-opacity duration-1000 p-6 md:p-10"
                                style={{ opacity: i === slide ? 1 : 0 }}
                            >
                                <div className="relative w-full h-full">
                                    <Image 
                                        src={src} 
                                        alt={`Promo ${i + 1}`} 
                                        fill 
                                        className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                                    />
                                </div>
                            </div>
                        ))}
                        
                        {/* Dot indicators */}
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
                            {PROMO_IMAGES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSlide(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'bg-blue-600 w-8' : 'bg-gray-200 w-2'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
                        {success ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Terkirim!</h3>
                                <p className="text-gray-500 text-sm">Tim kami akan segera menghubungi Anda melalui WhatsApp.</p>
                                <button 
                                    onClick={() => setSuccess(false)}
                                    className="mt-8 text-blue-600 text-sm font-semibold hover:underline"
                                >
                                    Kirim data lain
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">Pendaftaran Digital</h3>
                                    <p className="text-gray-400 text-sm">Silakan lengkapi formulir di bawah ini</p>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="group">
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </span>
                                            <input
                                                type="text" value={name} onChange={e => setName(e.target.value)} required
                                                placeholder="Nama Lengkap"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="group">
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </span>
                                            <input
                                                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                                                placeholder="Alamat Email"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </span>
                                            <input
                                                type="tel" value={phone} onChange={e => setPhone(e.target.value)} required
                                                placeholder="WhatsApp (Contoh: 0812...)"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    {error && <p className="text-red-500 text-xs mt-2 ml-2">⚠ {error}</p>}

                                    <button
                                        type="submit" disabled={loading}
                                        className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/10 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
                                    >
                                        {loading ? (
                                            <svg className="animate-spin h-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <>
                                                <span>Ambil Promo Sekarang</span>
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
