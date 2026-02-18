import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getStats() {
    const totalProperties = await prisma.property.count()
    const availableProperties = await prisma.property.count({ where: { status: 'AVAILABLE' } })
    const soldProperties = await prisma.property.count({ where: { status: 'SOLD' } })
    const featuredProperties = await prisma.property.count({ where: { featured: true } })

    return { totalProperties, availableProperties, soldProperties, featuredProperties }
}

async function getRecentProperties() {
    return prisma.property.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    })
}

export default async function DashboardPage() {
    const stats = await getStats()
    const recentProperties = await getRecentProperties()

    const statCards = [
        { label: 'Total Properti', value: stats.totalProperties, icon: '🏠', gradient: 'from-blue-600 to-blue-400' },
        { label: 'Tersedia', value: stats.availableProperties, icon: '✅', gradient: 'from-emerald-600 to-emerald-400' },
        { label: 'Terjual', value: stats.soldProperties, icon: '🎉', gradient: 'from-purple-600 to-purple-400' },
        { label: 'Unggulan', value: stats.featuredProperties, icon: '⭐', gradient: 'from-amber-500 to-yellow-400' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-8">
            {/* Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400 mt-1">Selamat datang di admin panel Rumah Bintaro</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, idx) => (
                        <div key={idx} className="w-full p-4 bg-gradient-to-br from-red-500/20 to-red-500/5 border border-white/10 rounded-xl text-left hover:bg-red-500/30 transition-all group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Aksi Cepat</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/dashboard/properties/new"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-xl font-medium hover:from-rose-500 hover:to-rose-400 transition-all shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40"
                        >
                            <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Tambah Properti Baru
                        </Link>
                        <Link
                            href="/dashboard/properties"
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all border border-white/10 hover:border-white/20"
                        >
                            <svg className="w-8 h-8 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                            Lihat Semua Properti
                        </Link>
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all border border-white/10 hover:border-white/20"
                        >
                            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            Lihat Website
                        </Link>
                    </div>
                </div>

                {/* Recent Properties */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Properti Terbaru</h2>
                        <Link href="/dashboard/properties" className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                            Lihat Semua →
                        </Link>
                    </div>

                    {recentProperties.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <p>Belum ada properti. Tambahkan properti pertama Anda!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                                        <th className="pb-3 font-medium">Properti</th>
                                        <th className="pb-3 font-medium">Lokasi</th>
                                        <th className="pb-3 font-medium">Harga</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentProperties.map((property) => (
                                        <tr key={property.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="py-4">
                                                <p className="font-medium text-white">{property.title}</p>
                                            </td>
                                            <td className="py-4 text-gray-400">{property.location}</td>
                                            <td className="py-4 text-gray-300">
                                                Rp {property.price.toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${property.status === 'AVAILABLE'
                                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                    : property.status === 'SOLD'
                                                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                    }`}>
                                                    {property.status}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <Link
                                                    href={`/dashboard/properties/${property.id}/edit`}
                                                    className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
