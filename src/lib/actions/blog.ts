'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBlogPost(formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const image = formData.get('image') as string
  const dateStr = formData.get('date') as string

  await db.blogPost.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      date: new Date(dateStr),
    },
  })

  revalidatePath('/blog')
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function updateBlogPost(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const image = formData.get('image') as string
  const dateStr = formData.get('date') as string

  await db.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      date: new Date(dateStr),
    },
  })

  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function deleteBlogPost(id: string) {
  await db.blogPost.delete({
    where: { id },
  })

  revalidatePath('/blog')
  revalidatePath('/admin/blog')
}
