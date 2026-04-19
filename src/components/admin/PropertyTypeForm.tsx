'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PropertyTypeFormProps {
  propertyId: string
  action: (formData: FormData) => Promise<void>
}

export default function PropertyTypeForm({ propertyId, action }: PropertyTypeFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setIsUploading(true)
    
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()
      formData.append('file', files[i])
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) setImages(prev => [...prev, data.url])
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }
    setIsUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('images', JSON.stringify(images))
    
    // Convert all other inputs to a specs JSON object for "flexibility"
    const specs: Record<string, any> = {}
    const data = Object.fromEntries(formData.entries())
    const coreFields = ['type', 'bedrooms', 'bathrooms', 'carPack', 'images']
    
    Object.keys(data).forEach(key => {
      if (!coreFields.includes(key)) {
        specs[key] = data[key]
      }
    })
    
    formData.append('specs', JSON.stringify(specs))
    
    await action(formData)
    e.currentTarget.reset()
    setImages([])
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
      <h3 className="font-bold text-gray-900">Tambah Tipe Unit Baru</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-bold text-gray-500 mb-1">Nama Tipe (e.g. Tipe 170/248)</label>
          <input type="text" name="type" required className="w-full px-3 py-2 rounded-lg border border-gray-200" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Bedrooms</label>
          <input type="number" name="bedrooms" className="w-full px-3 py-2 rounded-lg border border-gray-200" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Bathrooms</label>
          <input type="number" name="bathrooms" className="w-full px-3 py-2 rounded-lg border border-gray-200" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Car Pack</label>
          <input type="number" name="carPack" className="w-full px-3 py-2 rounded-lg border border-gray-200" />
        </div>
        {/* Extra Flexible Specs */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Kitchen</label>
          <input type="number" name="kitchen" className="w-full px-3 py-2 rounded-lg border border-gray-200" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Living Room</label>
          <input type="number" name="livingRoom" className="w-full px-3 py-2 rounded-lg border border-gray-200" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1">Gallery (Multiple Images)</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-16 h-16 rounded overflow-hidden">
              <Image src={img} alt="Gallery item" fill className="object-cover" />
              <button type="button" onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} className="absolute top-0 right-0 bg-red-600 text-white text-[10px] p-1">✕</button>
            </div>
          ))}
        </div>
        <input type="file" multiple accept="image/*" onChange={handleFileUpload} disabled={isUploading} className="text-sm" />
      </div>

      <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-xl font-bold hover:bg-black transition-all">
        Simpan Tipe Unit
      </button>
    </form>
  )
}
