import db from '@/lib/db'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

const categoryLabels: Record<string, string> = {
  kesehatan: '🏥 Kesehatan',
  edukasi: '🎓 Edukasi',
  kantor: '🏢 Kantor',
  hiburan: '🎭 Hiburan',
  olahraga: '⚽ Olahraga',
  belanja: '🛒 Belanja',
}

export default async function AdminFacilityPage() {
  const facilities = await db.facility.findMany({
    orderBy: { category: 'asc' },
  })

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Fasilitas</h1>
          <div className="flex gap-4">
            <Link href="/admin/property" className="text-blue-600 font-bold hover:underline">Properti</Link>
            <Link href="/admin/kavling" className="text-blue-600 font-bold hover:underline">Kavling</Link>
            <Link href="/admin/blog" className="text-blue-600 font-bold hover:underline">Blog</Link>
            <Link href="/admin/promo" className="text-blue-600 font-bold hover:underline">Promo</Link>
            <Link href="/admin/hero" className="text-blue-600 font-bold hover:underline">Hero</Link>
            <Link
              href="/admin/facility/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              + Tambah Fasilitas
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Nama</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Kategori</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {facilities.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{f.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{categoryLabels[f.category] || f.category}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link href={`/admin/facility/edit/${f.id}`} className="text-blue-600 font-bold hover:underline">Edit</Link>
                    <DeleteButton postId={f.id} type="facility" />
                  </td>
                </tr>
              ))}
              {facilities.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">No facilities found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
