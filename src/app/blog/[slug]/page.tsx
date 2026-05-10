import db from '@/lib/db'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Props {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params
    const post = await db.blogPost.findUnique({
        where: { slug }
    })

    if (!post) return { title: 'Artikel Tidak Ditemukan' }

    return {
        title: `${post.title} | Blog Rumah Bintaro`,
        description: post.excerpt,
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = params
    const post = await db.blogPost.findUnique({
        where: { slug }
    })

    if (!post) notFound()

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Image Section */}
            <div className="relative h-[40vh] md:h-[60vh] w-full">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-4xl mx-auto px-4 pb-12 w-full">
                        <div className="bg-blue-600 px-4 py-1.5 rounded-full text-white text-xs font-bold w-fit mb-4">
                            INFORMASI PROPERTI
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-blue-200 mt-4 font-medium">
                            Diposting pada {post.date.toISOString().split('T')[0]} oleh Admin
                        </p>
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div className="py-20">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed italic border-l-4 border-gray-200 pl-6 mb-12">
                        {post.excerpt}
                    </div>

                    <div
                        className="prose prose-lg prose-blue max-w-none text-gray-800 mb-16"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Contact Information Card */}
                    <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 mb-16">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                                    Konsultasi <span className="text-blue-600">Gratis!</span>
                                </h3>
                                <p className="text-gray-600 font-medium">
                                    Ingin tanya lebih lanjut atau survey lokasi? <br className="hidden md:block" />
                                    Marketing kami siap membantu Anda kapan saja.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                                <a 
                                    href="https://wa.me/6281808187943?text=Halo%20Rumah%20Bintaro,%20saya%20tertarik%20dengan%20properti%20setelah%20membaca%20artikel:%20"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-100 w-full sm:w-auto group"
                                >
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    WhatsApp Sekarang
                                </a>
                                
                                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lokasi</p>
                                        <p className="text-sm font-bold text-gray-900">Bintaro Jaya, Tangsel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="border-t border-gray-100 pt-12 flex justify-between items-center">
                        <Link 
                            href="/blog"
                            className="flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Kembali ke Blog
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
