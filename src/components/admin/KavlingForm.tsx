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
  } | null
  action: (formData: FormData) => Promise<void>
}

export default function KavlingForm({ kavling, action }: KavlingFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(kavling?.image || '')

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
        <label className="block text-sm font-bold text-gray-700 mb-2">Gambar</label>
        <div className="relative h-48 w-full bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              <button type="button" onClick={() => setImageUrl('')} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700">✕</button>
            </>
          ) : (
            <div className="text-center">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="kavling-upload" disabled={isUploading} />
              <label htmlFor="kavling-upload" className="cursor-pointer text-blue-600 font-bold hover:underline">
                {isUploading ? 'Uploading...' : 'Click to Upload Image'}
              </label>
            </div>
          )}
        </div>
        <input type="hidden" name="image" value={imageUrl} />
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
