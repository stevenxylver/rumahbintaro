import db from '@/lib/db'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await db.blogPost.findUnique({
        where: { slug }
    })
    
    if (!post) return { title: 'Artikel Tidak Ditemukan' }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date.toISOString(),
            images: [{ url: post.image }],
        },
    }
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params
    const post = await db.blogPost.findUnique({
        where: { slug }
    })

    if (!post) notFound()

    return (
        <article className="bg-white min-h-screen pt-20">
            {/* Post Hero */}
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
                            Diposting pada {post.date.toISOString().split('T')[0]} oleh Tim Rumah Bintaro
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
                        className="prose prose-lg prose-blue max-w-none text-gray-800"
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    />

                    {/* Footer Nav */}
                    <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap justify-between items-center gap-6">
                        <Link 
                            href="/blog"
                            className="flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all"
                        >
                            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            Kembali ke Blog
                        </Link>

                    </div>
                </div>
            </div>
        </article>
    )
}

export async function generateStaticParams() {
    const posts = await db.blogPost.findMany({
        select: { slug: true }
    })
    return posts.map((post) => ({
        slug: post.slug,
    }))
}
