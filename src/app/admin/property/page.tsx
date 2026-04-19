import db from '@/lib/db'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'
import Image from 'next/image'

export default async function AdminPropertyPage() {
  const properties = await db.property.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { products: true } } }
  })

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Properti / Cluster</h1>
          <div className="flex gap-4">
            <Link href="/admin/blog" className="text-blue-600 font-bold hover:underline">Blog</Link>
            <Link href="/admin/kavling" className="text-blue-600 font-bold hover:underline">Kavling</Link>
            <Link href="/admin/facility" className="text-blue-600 font-bold hover:underline">Fasilitas</Link>
            <Link
              href="/admin/property/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              + Tambah Cluster
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Cluster</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Unit/Tipe</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-gray-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {p._count.products} Tipe Rumah
                  </td>
                  <td className="px-6 py-4">
                    {p.hot && <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">🔥 HOT</span>}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link href={`/admin/property/edit/${p.id}`} className="text-blue-600 font-bold hover:underline">Edit</Link>
                    <DeleteButton postId={p.id} type="property" />
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No properties found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
