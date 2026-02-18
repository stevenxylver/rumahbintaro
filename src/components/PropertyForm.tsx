'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { generateSlug } from '@/lib/utils'

interface Property {
    id?: string
    title: string
    slug: string
    description: string
    price: number
    location: string
    address: string | null
    bedrooms: number | null
    bathrooms: number | null
    area: number | null
    images: string
    featured: boolean
    status: string
}

interface PropertyFormProps {
    property?: Property
    isEdit?: boolean
}

export function PropertyForm({ property, isEdit = false }: PropertyFormProps) {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        title: property?.title || '',
        slug: property?.slug || '',
        description: property?.description || '',
        price: property?.price || 0,
        location: property?.location || '',
        address: property?.address || '',
        bedrooms: property?.bedrooms || 0,
        bathrooms: property?.bathrooms || 0,
        area: property?.area || 0,
        featured: property?.featured || false,
        status: property?.status || 'AVAILABLE',
    })

    const [images, setImages] = useState<string[]>(
        property?.images ? JSON.parse(property.images) : []
    )

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData({
            ...formData,
            title,
            slug: isEdit ? formData.slug : generateSlug(title)
        })
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files?.length) return

        setUploading(true)
        const formDataUpload = new FormData()

        for (let i = 0; i < files.length; i++) {
            formDataUpload.append('files', files[i])
        }

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formDataUpload,
            })

            if (!res.ok) throw new Error('Upload failed')

            const data = await res.json()
            setImages([...images, ...data.files])
        } catch (_err) {
            setError('Gagal upload gambar')
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const payload = {
                ...formData,
                images: JSON.stringify(images),
            }

            const url = isEdit ? `/api/properties/${property?.id}` : '/api/properties'
            const method = isEdit ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error('Failed to save')

            router.push('/dashboard/properties')
            router.refresh()
        } catch (_err) {
            setError('Gagal menyimpan properti')
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Apakah Anda yakin ingin menghapus properti ini?')) return

        setLoading(true)
        try {
            const res = await fetch(`/api/properties/${property?.id}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Failed to delete')

            router.push('/dashboard/properties')
            router.refresh()
        } catch (_err) {
            setError('Gagal menghapus properti')
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl">
                    {error}
                </div>
            )}

            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Informasi Dasar</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul Properti *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="Contoh: Rumah Minimalis 2 Lantai di Bintaro Sektor 9"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="rumah-minimalis-2-lantai"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Deskripsi lengkap properti..."
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Harga (Rp) *</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                            placeholder="1500000000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi *</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Bintaro Sektor 9"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Jl. Mawar No. 123, RT 01/RW 02"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Spesifikasi</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kamar Tidur</label>
                        <input
                            type="number"
                            value={formData.bedrooms}
                            onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
                            placeholder="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kamar Mandi</label>
                        <input
                            type="number"
                            value={formData.bathrooms}
                            onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 0 })}
                            placeholder="2"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Luas (m²)</label>
                        <input
                            type="number"
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: parseFloat(e.target.value) || 0 })}
                            placeholder="120"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                </div>
            </div>

            {/* Status & Featured */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Status & Pengaturan</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="AVAILABLE">Tersedia</option>
                            <option value="SOLD">Terjual</option>
                            <option value="RESERVED">Reserved</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">Tandai sebagai Properti Unggulan</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Gambar Properti</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative group">
                            <div className="relative h-32 rounded-xl overflow-hidden bg-gray-100">
                                <Image src={img} alt={`Image ${idx + 1}`} fill className="object-cover" />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    {/* Upload Button */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition disabled:opacity-50"
                    >
                        {uploading ? (
                            <span>Uploading...</span>
                        ) : (
                            <>
                                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-sm">Tambah Gambar</span>
                            </>
                        )}
                    </button>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <p className="text-sm text-gray-500">Format: JPG, PNG, WebP. Max 5MB per file.</p>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
                <div>
                    {isEdit && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-6 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition disabled:opacity-50"
                        >
                            Hapus Properti
                        </button>
                    )}
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Menyimpan...' : isEdit ? 'Update Properti' : 'Simpan Properti'}
                    </button>
                </div>
            </div>
        </form>
    )
}
