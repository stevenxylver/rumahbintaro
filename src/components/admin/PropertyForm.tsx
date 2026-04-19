'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PropertyFormProps {
  property?: {
    id: string
    name: string
    slug: string
    image: string
    hot: boolean
    virtualRoomUrl: string | null
    brosurUrl: string | null
    description: string | null
  } | null
  action: (formData: FormData) => Promise<void>
}

export default function PropertyForm({ property, action }: PropertyFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(property?.image || '')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) setImageUrl(data.url)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form action={action} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nama Cluster</label>
          <input type="text" name="name" defaultValue={property?.name} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
          <input type="text" name="slug" defaultValue={property?.slug} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Virtual Tour URL (Matterport)</label>
          <input type="url" name="virtualRoomUrl" defaultValue={property?.virtualRoomUrl || ''} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Brosur URL (Google Drive/PDF)</label>
          <input type="url" name="brosurUrl" defaultValue={property?.brosurUrl || ''} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" name="hot" id="hot" defaultChecked={property?.hot} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <label htmlFor="hot" className="text-sm font-bold text-gray-700">🔥 Hot / Populer (Akan muncul di Homepage)</label>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Featured</label>
        <div className="relative h-48 w-full bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              <button type="button" onClick={() => setImageUrl('')} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700">✕</button>
            </>
          ) : (
            <div className="text-center">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="property-upload" disabled={isUploading} />
              <label htmlFor="property-upload" className="cursor-pointer text-blue-600 font-bold hover:underline">
                {isUploading ? 'Uploading...' : 'Click to Upload Image'}
              </label>
            </div>
          )}
        </div>
        <input type="hidden" name="image" value={imageUrl} />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Cluster</label>
        <textarea name="description" defaultValue={property?.description || ''} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-blue-600 text-white px-12 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          {property ? 'Update Cluster' : 'Tambah Cluster'}
        </button>
      </div>
    </form>
  )
}
