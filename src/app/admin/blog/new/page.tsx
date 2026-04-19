import BlogForm from '@/components/admin/BlogForm'
import { createBlogPost } from '@/lib/actions/blog'
import Link from 'next/link'

export default function NewBlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/blog" className="text-blue-600 font-bold hover:underline">
            ← Back to List
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Create New Post</h1>
        </div>

        <BlogForm action={createBlogPost} />
      </div>
    </div>
  )
}
