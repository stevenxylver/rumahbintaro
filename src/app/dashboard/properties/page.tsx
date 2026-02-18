import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getProperties() {
    return prisma.property.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export default async function DashboardPropertiesPage() {
    const properties = await getProperties()

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Daftar Properti</h1>
                    <p className="text-gray-600 mt-1">Kelola semua properti Anda</p>
                </div>
                <Link
                    href="/dashboard/properties/new"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Properti
                </Link>
            </div>

            {/* Properties Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {properties.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🏠</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Properti</h3>
                        <p className="text-gray-500 mb-6">Mulai dengan menambahkan properti pertama Anda</p>
                        <Link
                            href="/dashboard/properties/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Properti Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-gray-600 text-sm">
                                    <th className="px-6 py-4 font-semibold">Properti</th>
                                    <th className="px-6 py-4 font-semibold">Lokasi</th>
                                    <th className="px-6 py-4 font-semibold">Harga</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Featured</th>
                                    <th className="px-6 py-4 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((property) => (
                                    <tr key={property.id} className="border-t hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-800">{property.title}</p>
                                                <p className="text-sm text-gray-500">/{property.slug}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{property.location}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            Rp {property.price.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${property.status === 'AVAILABLE'
                                                    ? 'bg-green-100 text-green-700'
                                                    : property.status === 'SOLD'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {property.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {property.featured ? (
                                                <span className="text-yellow-500">⭐</span>
                                            ) : (
                                                <span className="text-gray-300">☆</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/properties/${property.slug}`}
                                                    target="_blank"
                                                    className="text-gray-500 hover:text-gray-700 transition"
                                                    title="Lihat"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={`/dashboard/properties/${property.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-700 transition"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
