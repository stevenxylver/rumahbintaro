import db from '@/lib/db'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminKavlingPage() {
  const kavlings = await db.kavling.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Kavling</h1>
          <div className="flex gap-4">
            <Link href="/admin/blog" className="text-blue-600 font-bold hover:underline">Blog</Link>
            <Link href="/admin/property" className="text-blue-600 font-bold hover:underline">Property</Link>
            <Link href="/admin/facility" className="text-blue-600 font-bold hover:underline">Fasilitas</Link>
            <Link href="/admin/promo" className="text-blue-600 font-bold hover:underline">Promo</Link>
            <Link href="/admin/hero" className="text-blue-600 font-bold hover:underline">Hero</Link>
            <Link
              href="/admin/kavling/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              + Tambah Kavling
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Cluster</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Size</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Hot</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {kavlings.map((k) => (
                <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{k.name}</div>
                    <div className="text-xs text-gray-400">{k.kodeBlok}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{k.cluster}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{k.size}</td>
                  <td className="px-6 py-4 text-sm">
                    {k.hot ? <span className="text-orange-500 font-bold">🔥 Hot</span> : '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link
                      href={`/admin/kavling/edit/${k.id}`}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton postId={k.id} type="kavling" />
                  </td>
                </tr>
              ))}
              {kavlings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No kavlings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
