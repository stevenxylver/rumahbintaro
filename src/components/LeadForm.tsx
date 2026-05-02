'use client'

import { useState, FormEvent } from 'react'
import { trackLeadForm } from '@/lib/gtag'

export function LeadForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: FormEvent) => {
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
        <div className="max-w-3xl mx-auto relative group">
            {/* Ultra-premium animated gradient glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-500 animate-gradient-x"></div>
            
            <div className="relative bg-white border border-gray-100/50 rounded-[2.5rem] p-8 md:p-14 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]">
                {success ? (
                    <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Berhasil Terkirim!</h3>
                        <p className="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed">
                            Terima kasih! Konsultan properti kami akan segera menghubungi Anda melalui WhatsApp.
                        </p>
                        <button
                            onClick={() => setSuccess(false)}
                            className="mt-10 px-8 py-3 bg-gray-50 text-gray-600 text-sm font-bold rounded-full hover:bg-gray-100 transition-all border border-gray-200"
                        >
                            Kirim data lain
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Konsultasi Gratis</h3>
                            <p className="text-gray-400 text-base">Dapatkan informasi lengkap & jadwal kunjungan unit</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Nama Lengkap</label>
                                    <div className="relative group/input">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-blue-600 transition-colors duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text" value={name} onChange={e => setName(e.target.value)} required
                                            placeholder="John Doe"
                                            className="w-full pl-14 pr-6 py-4.5 bg-gray-50/50 border border-gray-200/80 rounded-2xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Email</label>
                                    <div className="relative group/input">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-blue-600 transition-colors duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="email" value={email} onChange={e => setEmail(e.target.value)} required
                                            placeholder="john@example.com"
                                            className="w-full pl-14 pr-6 py-4.5 bg-gray-50/50 border border-gray-200/80 rounded-2xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Nomor WhatsApp</label>
                                <div className="relative group/input">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-blue-600 transition-colors duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="tel" value={phone} onChange={e => setPhone(e.target.value)} required
                                        placeholder="0812 3456 7890"
                                        className="w-full pl-14 pr-6 py-4.5 bg-gray-50/50 border border-gray-200/80 rounded-2xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-500 text-xs mt-2 ml-4 animate-bounce">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                type="submit" disabled={loading}
                                className="w-full py-5 mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-black text-lg rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 group/btn overflow-hidden relative"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <span className="relative z-10">Kirim Pendaftaran</span>
                                        <svg className="w-6 h-6 group-hover/btn:translate-x-1.5 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                        
                                        {/* Subtle shine effect */}
                                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}
