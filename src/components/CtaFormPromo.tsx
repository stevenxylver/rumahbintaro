'use client'

import { useState } from 'react'
import Image from 'next/image'
import { trackLeadForm } from '@/lib/gtag'

interface PromoData {
  id: string;
  image: string;
  title: string | null;
}

export function Ctaformpromo({ promos = [] }: { promos?: PromoData[] }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

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
        <section id="promo-form" className="bg-white py-16 px-4 md:px-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-[0.2em] mb-4 border border-blue-100">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        PENAWARAN EKSKLUSIF
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Promo <span className="text-blue-600">Terbaru</span>
                    </h2>

                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {promos.length > 0 ? (
                        promos.map((promo, i) => (
                            <div
                                key={promo.id}
                                className="flex-none w-[65vw] sm:w-[45vw] md:w-full relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-gray-50 group snap-center"
                            >
                                <Image
                                    src={promo.image}
                                    alt={promo.title || `Promo ${i + 1}`}
                                    fill
                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center py-8 text-gray-500">
                            Belum ada promo yang tersedia saat ini.
                        </div>
                    )}
                </div>

                <div className="max-w-3xl mx-auto relative group">
                    {/* Subtle animated gradient glow behind the card */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-[2.2rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
                    
                    <div className="relative bg-white border border-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5">
                        {success ? (
                            <div className="text-center py-8">
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
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">Pendaftaran Digital</h3>
                                    <p className="text-gray-400 text-sm">Silakan lengkapi formulir di bawah ini</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="group/input">
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-blue-600 transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="text" value={name} onChange={e => setName(e.target.value)} required
                                                    placeholder="Nama Lengkap"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="group/input">
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-blue-600 transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="email" value={email} onChange={e => setEmail(e.target.value)} required
                                                    placeholder="Alamat Email"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group/input">
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-blue-600 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </span>
                                            <input
                                                type="tel" value={phone} onChange={e => setPhone(e.target.value)} required
                                                placeholder="WhatsApp (Contoh: 0812...)"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    {error && <p className="text-red-500 text-xs mt-2 ml-2">⚠ {error}</p>}

                                    <button
                                        type="submit" disabled={loading}
                                        className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group/btn"
                                    >
                                        {loading ? (
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <>
                                                <span>Ambil Promo Sekarang</span>
                                                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

