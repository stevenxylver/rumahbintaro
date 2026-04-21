'use client'

import { useState } from 'react'
import Image from 'next/image'
import { slugify } from '@/lib/utils'


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
    images: string | null
  } | null
  action: (formData: FormData) => Promise<void>
}

export default function PropertyForm({ property, action }: PropertyFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(property?.image || '')
  const [gallery, setGallery] = useState<string[]>(property?.images ? JSON.parse(property.images) : [])
  const [slug, setSlug] = useState(property?.slug || '')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    // Only auto-update slug if we are creating a new property
    if (!property) {
      setSlug(slugify(name))
    }
  }


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    setIsUploading(true)
    
    if (isGallery) {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData()
        formData.append('file', files[i])
        try {
          const res = await fetch('/api/upload', { method: 'POST', body: formData })
          const data = await res.json()
          if (data.url) setGallery(prev => [...prev, data.url])
        } catch (error) {
          console.error('Upload failed:', error)
        }
      }
    } else {
      const formData = new FormData()
      formData.append('file', files[0])
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) setImageUrl(data.url)
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }
    setIsUploading(false)
  }

  return (
    <form action={action} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nama Cluster</label>
          <input type="text" name="name" defaultValue={property?.name} onChange={handleNameChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
          <input type="text" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
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
        <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Featured (Utama)</label>
        <div className="relative h-48 w-full bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              <button type="button" onClick={() => setImageUrl('')} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700">✕</button>
            </>
          ) : (
            <div className="text-center">
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, false)} className="hidden" id="property-upload" disabled={isUploading} />
              <label htmlFor="property-upload" className="cursor-pointer text-blue-600 font-bold hover:underline">
                {isUploading ? 'Uploading...' : 'Click to Upload Featured Image'}
              </label>
            </div>
          )}
        </div>
        <input type="hidden" name="image" value={imageUrl} />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Gallery Cluster (Beberapa Gambar)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
          {gallery.map((img, idx) => (
            <div key={idx} className="relative h-24 bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
              <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
              <button type="button" onClick={() => setGallery(prev => prev.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs">✕</button>
            </div>
          ))}
          <div className="relative h-24 bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
            <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, true)} className="hidden" id="gallery-upload" disabled={isUploading} />
            <label htmlFor="gallery-upload" className="cursor-pointer text-blue-400 text-xs font-bold hover:underline">
              {isUploading ? '...' : '+ Add Gallery'}
            </label>
          </div>
        </div>
        <input type="hidden" name="images" value={JSON.stringify(gallery)} />
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
