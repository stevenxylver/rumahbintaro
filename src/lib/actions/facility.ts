'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createFacility(formData: FormData) {
  const title = formData.get('title') as string
  const image = formData.get('image') as string
  const category = formData.get('category') as string
  const images = formData.get('images') as string // JSON string array

  await db.facility.create({
    data: { title, image, category, images: images || null },
  })

  revalidatePath('/')
  revalidatePath('/admin/facility')
  redirect('/admin/facility')
}

export async function updateFacility(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const image = formData.get('image') as string
  const category = formData.get('category') as string
  const images = formData.get('images') as string // JSON string array

  await db.facility.update({
    where: { id },
    data: { title, image, category, images: images || null },
  })

  revalidatePath('/')
  revalidatePath('/admin/facility')
  redirect('/admin/facility')
}

export async function deleteFacility(id: string) {
  await db.facility.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/admin/facility')
}
