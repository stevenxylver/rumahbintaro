'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PropertyForm from '@/components/admin/PropertyForm'
import PropertyTypeForm from '@/components/admin/PropertyTypeForm'
import { createProperty } from '@/lib/actions/property'

export default function NewPropertyClient() {
  const [types, setTypes] = useState<any[]>([])

  const handleAddTypeLocally = async (formData: FormData) => {
    const type = formData.get('type') as string
    const bedrooms = formData.get('bedrooms') as string
    const bathrooms = formData.get('bathrooms') as string
    const carPack = formData.get('carPack') as string
    const specs = formData.get('specs') as string

    const newType = {
      type,
      bedrooms,
      bathrooms,
      carPack,
      specs,
      images: '[]' // For simplicity in "New" mode, we'll implement full gallery later if needed
    }

    setTypes(prev => [...prev, newType])
  }

  const handleRemoveType = (index: number) => {
    setTypes(prev => prev.filter((_, i) => i !== index))
  }

  const enhancedCreateAction = async (formData: FormData) => {
    // Inject the temporary types into the form data
    formData.append('types', JSON.stringify(types))
    return createProperty(formData)
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/property" className="text-blue-600 font-bold hover:underline">← Back to List</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Tambah Cluster Baru</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Info */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Cluster Details</h2>
            <PropertyForm action={enhancedCreateAction} />
          </section>

          {/* House Types */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Tipe Unit / Produk</h2>
            <p className="text-sm text-gray-500 bg-blue-50 p-4 rounded-xl border border-blue-100 italic">
              ✨ Unit yang ditambahkan di sini akan disimpan bersamaan saat Anda menekan tombol "Tambah Cluster" di kolom sebelah kiri.
            </p>
            
            <PropertyTypeForm action={handleAddTypeLocally} />

            <div className="space-y-4">
              {types.map((type, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {idx + 1}
                     </div>
                     <div>
                        <div className="font-bold text-gray-900">{type.type}</div>
                        <div className="text-xs text-gray-500">{type.bedrooms} BR | {type.bathrooms} BA | {type.carPack} Car</div>
                     </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleRemoveType(idx)} 
                    className="text-red-600 text-sm font-bold hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              {types.length === 0 && (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl">
                  Belum ada tipe unit yang ditambahkan.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
