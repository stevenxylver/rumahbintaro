'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PromoFormProps {
  promo?: {
    id: string
    title: string | null
    image: string
  } | null
  action: (formData: FormData) => Promise<void>
}

export default function PromoForm({ promo, action }: PromoFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(promo?.image || '')

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
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Judul Promo (Opsional)</label>
        <input 
          type="text" 
          name="title" 
          defaultValue={promo?.title || ''} 
          placeholder="Cth: Promo Lebaran" 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Promo (Portrait, misal 4:5)</label>
        <div className="relative h-64 w-full md:w-64 bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              <button type="button" onClick={() => setImageUrl('')} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700">✕</button>
            </>
          ) : (
            <div className="text-center">
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e)} className="hidden" id="promo-upload" disabled={isUploading} />
              <label htmlFor="promo-upload" className="cursor-pointer text-blue-600 font-bold hover:underline">
                {isUploading ? 'Uploading...' : 'Click to Upload Image'}
              </label>
            </div>
          )}
        </div>
        <input type="hidden" name="image" value={imageUrl} />
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-blue-600 text-white px-12 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          {promo ? 'Update Promo' : 'Tambah Promo'}
        </button>
      </div>
    </form>
  )
}
