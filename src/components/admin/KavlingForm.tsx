'use client'

import { useState } from 'react'
import Image from 'next/image'

interface KavlingFormProps {
  kavling?: {
    id: string
    name: string
    slug: string
    kodeBlok: string
    cluster: string
    image: string
    size: string
    hot: boolean
    description: string | null
    images: string | null
  } | null
  action: (formData: FormData) => Promise<void>
}

export default function KavlingForm({ kavling, action }: KavlingFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(kavling?.image || '')
  const [gallery, setGallery] = useState<string[]>(kavling?.images ? JSON.parse(kavling.images) : [])

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
          <label className="block text-sm font-bold text-gray-700 mb-2">Nama Kavling</label>
          <input type="text" name="name" defaultValue={kavling?.name} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
          <input type="text" name="slug" defaultValue={kavling?.slug} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Kode Blok</label>
          <input type="text" name="kodeBlok" defaultValue={kavling?.kodeBlok} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Cluster</label>
          <input type="text" name="cluster" defaultValue={kavling?.cluster} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Ukuran</label>
          <input type="text" name="size" defaultValue={kavling?.size} required placeholder="e.g. 704 m²" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div className="flex items-center gap-3 pt-8">
          <input type="checkbox" name="hot" id="hot" defaultChecked={kavling?.hot} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <label htmlFor="hot" className="text-sm font-bold text-gray-700">🔥 Hot / Populer</label>
        </div>
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
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, false)} className="hidden" id="kavling-upload" disabled={isUploading} />
              <label htmlFor="kavling-upload" className="cursor-pointer text-blue-600 font-bold hover:underline">
                {isUploading ? 'Uploading...' : 'Click to Upload Featured Image'}
              </label>
            </div>
          )}
        </div>
        <input type="hidden" name="image" value={imageUrl} />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Gallery Kavling (Beberapa Gambar)</label>
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
        <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi (SEO)</label>
        <textarea name="description" defaultValue={kavling?.description || ''} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Deskripsi SEO untuk kavling ini..." />
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-blue-600 text-white px-12 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          {kavling ? 'Update Kavling' : 'Create Kavling'}
        </button>
      </div>
    </form>
  )
}
