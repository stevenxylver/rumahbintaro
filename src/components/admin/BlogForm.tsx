'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BlogPost } from '@prisma/client'

interface BlogFormProps {
  post?: BlogPost | null
  action: (formData: FormData) => Promise<void>
}

export default function BlogForm({ post, action }: BlogFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(post?.image || '')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setImageUrl(data.url)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form action={action} className="space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={post?.title}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              defaultValue={post?.slug}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="post-slug-url"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Publish Date</label>
            <input
              type="date"
              name="date"
              defaultValue={post?.date ? post.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image</label>
          <div className="relative h-48 w-full bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
            {imageUrl ? (
              <>
                <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                <button 
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                >
                  ✕
                </button>
              </>
            ) : (
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />
                <label htmlFor="file-upload" className="cursor-pointer text-blue-600 font-bold hover:underline">
                  {isUploading ? 'Uploading...' : 'Click to Upload Image'}
                </label>
              </div>
            )}
          </div>
          <input type="hidden" name="image" value={imageUrl} required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt (Short description)</label>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt}
          required
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          placeholder="Brief summary for indexing and preview..."
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Content (HTML)</label>
        <textarea
          name="content"
          defaultValue={post?.content}
          required
          rows={10}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-mono text-sm"
          placeholder="<h1>Title</h1><p>Main content...</p>"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-12 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  )
}
