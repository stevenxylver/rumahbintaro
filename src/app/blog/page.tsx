import db from '@/lib/db'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'Artikel & Berita Properti',
    description: 'Dapatkan informasi terbaru mengenai tren properti, tips hunian, dan berita seputar Bintaro Jaya dari tim ahli kami.',
}

const POSTS_PER_PAGE = 6

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { page?: string }
}) {
    // Ensure page is a valid number
    const currentPage = parseInt(searchParams.page || '1')
    const skip = (currentPage - 1) * POSTS_PER_PAGE

    // Fetch data and total count
    const [posts, totalPosts] = await Promise.all([
        db.blogPost.findMany({
            orderBy: { date: 'desc' },
            skip: skip,
            take: POSTS_PER_PAGE,
        }),
        db.blogPost.count()
    ])

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    return (
        <div className="bg-white min-h-screen pt-20">
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Artikel & Tips Properti</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Wawasan mendalam mengenai investasi tanah, pemilihan hunian, hingga gaya hidup di kawasan Bintaro.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {posts.map((post) => (
                            <Link 
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
                            >
                                <div className="relative h-60 w-full overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                                        PROPERTI TIPS
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                                        </svg>
                                        {post.date.toISOString().split('T')[0]}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 line-clamp-2 mb-6 text-sm">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                                        Selengkapnya
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination UI */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 md:gap-4">
                            <Link
                                href={`/blog?page=${Math.max(1, currentPage - 1)}`}
                                className={`px-4 py-2 md:px-6 md:py-3 rounded-2xl font-bold transition-all border ${
                                    currentPage === 1 
                                    ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed pointer-events-none' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-500 hover:text-blue-600 shadow-sm'
                                }`}
                            >
                                <span className="hidden md:inline">Previous</span>
                                <span className="md:hidden">&larr;</span>
                            </Link>
                            
                            <div className="flex gap-1 md:gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <Link
                                        key={pageNum}
                                        href={`/blog?page=${pageNum}`}
                                        className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl font-bold transition-all ${
                                            currentPage === pageNum
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-500'
                                        }`}
                                    >
                                        {pageNum}
                                    </Link>
                                ))}
                            </div>

                            <Link
                                href={`/blog?page=${Math.min(totalPages, currentPage + 1)}`}
                                className={`px-4 py-2 md:px-6 md:py-3 rounded-2xl font-bold transition-all border ${
                                    currentPage === totalPages 
                                    ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed pointer-events-none' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-500 hover:text-blue-600 shadow-sm'
                                }`}
                            >
                                <span className="hidden md:inline">Next</span>
                                <span className="md:hidden">&rarr;</span>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
