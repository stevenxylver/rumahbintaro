import db from '@/lib/db'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'
import Image from 'next/image'

export default async function AdminPromoPage() {
  const promos = await db.promo.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Manage Promo Terbaru</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/admin/property" className="text-blue-600 font-bold hover:underline">Property</Link>
            <Link href="/admin/kavling" className="text-blue-600 font-bold hover:underline">Kavling</Link>
            <Link href="/admin/facility" className="text-blue-600 font-bold hover:underline">Fasilitas</Link>
            <Link href="/admin/blog" className="text-blue-600 font-bold hover:underline">Blog</Link>
            <Link
              href="/admin/promo/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              + Tambah Promo
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Gambar Promo</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Judul</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {promos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-gray-200">
                      <Image src={p.image} alt={p.title || 'Promo'} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {p.title || '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link href={`/admin/promo/edit/${p.id}`} className="text-blue-600 font-bold hover:underline">Edit</Link>
                    <DeleteButton postId={p.id} type="promo" />
                  </td>
                </tr>
              ))}
              {promos.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">Belum ada promo yang ditambahkan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
