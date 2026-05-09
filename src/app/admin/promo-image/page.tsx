'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminPromoImagePage() {
    const [currentImage, setCurrentImage] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetchCurrentImage()
    }, [])

    const fetchCurrentImage = async () => {
        const res = await fetch('/api/admin/promo-image')
        const data = await res.json()
        if (data?.imageUrl) setCurrentImage(data.imageUrl)
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setMessage('')

        try {
            // Upload file
            const formData = new FormData()
            formData.append('file', file)
            const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
            const uploadData = await uploadRes.json()

            if (uploadData.url) {
                // Save to DB
                const res = await fetch('/api/admin/promo-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrl: uploadData.url })
                })

                if (res.ok) {
                    setMessage('✅ Gambar promo berhasil diperbarui!')
                    setCurrentImage(uploadData.url)
                } else {
                    setMessage('❌ Gagal menyimpan gambar')
                }
            } else {
                setMessage('❌ Gagal upload: ' + uploadData.error)
            }
        } catch (error: unknown) {
            setMessage('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Gambar Promo</h1>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Link href="/admin/property" className="text-blue-600 font-bold hover:underline">Properti</Link>
                        <Link href="/admin/kavling" className="text-blue-600 font-bold hover:underline">Kavling</Link>
                        <Link href="/admin/facility" className="text-blue-600 font-bold hover:underline">Fasilitas</Link>
                        <Link href="/admin/blog" className="text-blue-600 font-bold hover:underline">Blog</Link>
                        <Link href="/admin/promo" className="text-blue-600 font-bold hover:underline">Promo</Link>
                        <Link href="/admin/hero" className="text-blue-600 font-bold hover:underline">Hero</Link>
                        <Link href="/admin/banks" className="text-blue-600 font-bold hover:underline">Bank Partner</Link>
                    </div>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-semibold ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Current Image Preview */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Gambar Aktif Saat Ini</h2>
                        {currentImage ? (
                            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200">
                                <Image src={currentImage} alt="Gambar Promo Aktif" fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="w-full aspect-[16/10] rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                                <p className="text-gray-400">Belum ada gambar. Upload yang pertama!</p>
                            </div>
                        )}
                    </div>

                    {/* Upload New */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Gambar Baru</h2>
                        <p className="text-gray-600 mb-6">
                            Gambar ini akan tampil di section &quot;Promo Terbaik&quot; pada halaman utama website.
                            Gunakan gambar rumah atau properti yang menarik.
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100 disabled:opacity-50"
                        />
                        {uploading && <p className="mt-4 text-blue-600 font-semibold animate-pulse">⏳ Mengupload gambar...</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
