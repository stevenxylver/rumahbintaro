import PropertyForm from '@/components/admin/PropertyForm'
import PropertyTypeForm from '@/components/admin/PropertyTypeForm'
import { updateProperty, createPropertyType, deletePropertyType } from '@/lib/actions/property'
import db from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params
  const property = await db.property.findUnique({
    where: { id },
    include: { products: true }
  })
  if (!property) notFound()

  const updateAction = updateProperty.bind(null, id)
  const addTypeAction = createPropertyType.bind(null, id)

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/property" className="text-blue-600 font-bold hover:underline">← Back to List</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Cluster: {property.name}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Info */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Cluster Details</h2>
            <PropertyForm property={property} action={updateAction} />
          </section>

          {/* House Types */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Tipe Unit / Produk</h2>
            
            <PropertyTypeForm propertyId={id} action={addTypeAction} />

            <div className="space-y-4">
              {property.products.map((type) => (
                <div key={type.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden">
                        {type.images && JSON.parse(type.images).length > 0 && (
                          <Image src={JSON.parse(type.images)[0]} alt={type.type} fill className="object-cover" />
                        )}
                     </div>
                     <div>
                        <div className="font-bold text-gray-900">{type.type}</div>
                        <div className="text-xs text-gray-500">{type.bedrooms} BR | {type.bathrooms} BA | {type.carPack} Car</div>
                     </div>
                  </div>
                  <form action={deletePropertyType.bind(null, type.id, id)}>
                    <button type="submit" className="text-red-600 text-sm font-bold hover:underline">Hapus</button>
                  </form>
                </div>
              ))}
              {property.products.length === 0 && (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl">
                  Belum ada tipe unit ditambahkan.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
