import BlogForm from '@/components/admin/BlogForm'
import { updateBlogPost } from '@/lib/actions/blog'
import db from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params
  const post = await db.blogPost.findUnique({
    where: { id },
  })

  if (!post) notFound()

  // We need to wrap the action with the ID
  const updateAction = updateBlogPost.bind(null, id)

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/blog" className="text-blue-600 font-bold hover:underline">
            ← Back to List
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Post</h1>
        </div>

        <BlogForm post={post} action={updateAction} />
      </div>
    </div>
  )
}
