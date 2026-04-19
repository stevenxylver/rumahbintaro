'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createFacility(formData: FormData) {
  const title = formData.get('title') as string
  const image = formData.get('image') as string
  const category = formData.get('category') as string

  await db.facility.create({
    data: { title, image, category },
  })

  revalidatePath('/')
  revalidatePath('/admin/facility')
  redirect('/admin/facility')
}

export async function updateFacility(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const image = formData.get('image') as string
  const category = formData.get('category') as string

  await db.facility.update({
    where: { id },
    data: { title, image, category },
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
