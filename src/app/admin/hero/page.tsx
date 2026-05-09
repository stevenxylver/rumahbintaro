'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminHeroPage() {
    const [currentVideo, setCurrentVideo] = useState<{ id: string, videoUrl: string } | null>(null)
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('/api/admin/hero')
            .then(res => res.json())
            .then(data => setCurrentVideo(data))
            .catch(err => console.error('Error fetching hero:', err))
    }, [])

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setMessage('Uploading video...')

        try {
            const formData = new FormData()
            formData.append('file', file)

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            const uploadData = await uploadRes.json()

            if (uploadData.success) {
                const saveRes = await fetch('/api/admin/hero', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ videoUrl: uploadData.url })
                })

                if (saveRes.ok) {
                    const updatedHero = await saveRes.json()
                    setCurrentVideo(updatedHero)
                    setMessage('Video successfully updated!')
                } else {
                    setMessage('Failed to save video settings.')
                }
            } else {
                setMessage('Upload failed: ' + uploadData.error)
            }
        } catch (error: unknown) {
            setMessage('Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Hero Video</h1>
                    <div className="flex gap-4">
                        <Link href="/admin/property" className="text-blue-600 font-bold hover:underline">Cluster</Link>
                        <Link href="/admin/blog" className="text-blue-600 font-bold hover:underline">Blog</Link>
                        <Link href="/admin/kavling" className="text-blue-600 font-bold hover:underline">Kavling</Link>
                        <Link href="/admin/facility" className="text-blue-600 font-bold hover:underline">Fasilitas</Link>
                        <Link href="/admin/promo" className="text-blue-600 font-bold hover:underline">Promo</Link>
                        <Link href="/admin/banks" className="text-blue-600 font-bold hover:underline">Bank Partner</Link>
                        <Link href="/admin/promo-image" className="text-blue-600 font-bold hover:underline">Gambar Promo</Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Current Video Preview */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold mb-4">Current Active Video</h2>
                        {currentVideo ? (
                            <div className="space-y-4">
                                <div className="aspect-video rounded-2xl overflow-hidden bg-black relative">
                                    <video 
                                        key={currentVideo.videoUrl}
                                        src={currentVideo.videoUrl} 
                                        className="w-full h-full object-cover"
                                        controls
                                    />
                                </div>
                                <p className="text-sm text-gray-500 break-all">URL: {currentVideo.videoUrl}</p>
                            </div>
                        ) : (
                            <div className="aspect-video rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                                No video found in database. Using default fallback.
                            </div>
                        )}
                    </div>

                    {/* Upload Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold mb-4">Upload New Video</h2>
                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:border-blue-400 transition-colors">
                                <input
                                    type="file"
                                    id="video-upload"
                                    className="hidden"
                                    accept="video/*"
                                    onChange={handleUpload}
                                    disabled={uploading}
                                />
                                <label 
                                    htmlFor="video-upload" 
                                    className="cursor-pointer flex flex-col items-center gap-4"
                                >
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Click to upload video</p>
                                        <p className="text-sm text-gray-500">MP4, WebM up to 50MB</p>
                                    </div>
                                </label>
                            </div>

                            {message && (
                                <div className={`p-4 rounded-xl text-sm font-medium ${message.includes('Error') || message.includes('failed') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {message}
                                </div>
                            )}

                            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                <h3 className="text-amber-800 font-bold text-sm mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Optimization Tip
                                </h3>
                                <p className="text-xs text-amber-700 leading-relaxed">
                                    Untuk performa terbaik, gunakan video dengan resolusi 720p dan ukuran file di bawah 10MB. Format WebM sangat disarankan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
