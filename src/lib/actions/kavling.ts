'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createKavling(formData: FormData) {
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const kodeBlok = formData.get('kodeBlok') as string
  const cluster = formData.get('cluster') as string
  const image = formData.get('image') as string
  const size = formData.get('size') as string
  const hot = formData.get('hot') === 'on'
  const description = formData.get('description') as string
  const images = formData.get('images') as string // JSON string array

  await db.kavling.create({
    data: {
      name,
      slug,
      kodeBlok,
      cluster,
      image,
      size,
      hot,
      description: description || null,
      images: images || null,
    },
  })

  revalidatePath('/')
  revalidatePath('/kavling')
  revalidatePath(`/kavling/${slug}`)
  revalidatePath('/admin/kavling')
  redirect('/admin/kavling')
}

export async function updateKavling(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const kodeBlok = formData.get('kodeBlok') as string
  const cluster = formData.get('cluster') as string
  const image = formData.get('image') as string
  const size = formData.get('size') as string
  const hot = formData.get('hot') === 'on'
  const description = formData.get('description') as string
  const images = formData.get('images') as string // JSON string array

  await db.kavling.update({
    where: { id },
    data: {
      name,
      slug,
      kodeBlok,
      cluster,
      image,
      size,
      hot,
      description: description || null,
      images: images || null,
    },
  })

  revalidatePath('/')
  revalidatePath('/kavling')
  revalidatePath(`/kavling/${slug}`)
  revalidatePath('/admin/kavling')
  redirect('/admin/kavling')
}

export async function deleteKavling(id: string) {
  await db.kavling.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/kavling')
  revalidatePath('/admin/kavling')
}
