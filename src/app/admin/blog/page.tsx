import db from '@/lib/db'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Blog Posts</h1>
          <div className="flex gap-4">
            <Link href="/admin/property" className="text-blue-600 font-bold hover:underline">Properti</Link>
            <Link href="/admin/kavling" className="text-blue-600 font-bold hover:underline">Kavling</Link>
            <Link href="/admin/facility" className="text-blue-600 font-bold hover:underline">Fasilitas</Link>
            <Link href="/admin/promo" className="text-blue-600 font-bold hover:underline">Promo</Link>
            <Link href="/admin/hero" className="text-blue-600 font-bold hover:underline">Hero</Link>
            <Link
              href="/admin/blog/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              + Create New Post
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Title</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.date.toISOString().split('T')[0]}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.slug}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton postId={post.id} />
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No posts found. Start by creating one!
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
