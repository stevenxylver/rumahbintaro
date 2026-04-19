'use client'

import { useState } from 'react'
import Image from 'next/image'

const categoryOptions = [
  { id: 'kesehatan', name: 'Kesehatan', icon: '🏥' },
  { id: 'edukasi', name: 'Edukasi', icon: '🎓' },
  { id: 'kantor', name: 'Kantor', icon: '🏢' },
  { id: 'hiburan', name: 'Hiburan', icon: '🎭' },
  { id: 'olahraga', name: 'Olahraga', icon: '⚽' },
  { id: 'belanja', name: 'Belanja', icon: '🛒' },
]

interface FacilityFormProps {
  facility?: {
    id: string
    title: string
    image: string
    category: string
    images: string | null
  } | null
  action: (formData: FormData) => Promise<void>
}

export default function FacilityForm({ facility, action }: FacilityFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(facility?.image || '')


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    setIsUploading(true)
    
    const formData = new FormData()
    formData.append('file', files[0])
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) setImageUrl(data.url)
    } catch (error) {
      console.error('Upload failed:', error)
    }
    setIsUploading(false)
  }


  return (
    <form action={action} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nama Fasilitas</label>
          <input type="text" name="title" defaultValue={facility?.title} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
          <select name="category" defaultValue={facility?.category || 'kesehatan'} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all">
            {categoryOptions.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>
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
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e)} className="hidden" id="facility-upload" disabled={isUploading} />
              <label htmlFor="facility-upload" className="cursor-pointer text-blue-600 font-bold hover:underline">
                {isUploading ? 'Uploading...' : 'Click to Upload Featured Image'}
              </label>
            </div>

          )}
        </div>
        <input type="hidden" name="image" value={imageUrl} />
      </div>



      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-blue-600 text-white px-12 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          {facility ? 'Update Fasilitas' : 'Tambah Fasilitas'}
        </button>
      </div>
    </form>
  )
}
