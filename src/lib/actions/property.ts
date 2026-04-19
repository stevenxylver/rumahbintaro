'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProperty(formData: FormData) {
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const image = formData.get('image') as string
  const hot = formData.get('hot') === 'on'
  const virtualRoomUrl = formData.get('virtualRoomUrl') as string
  const brosurUrl = formData.get('brosurUrl') as string
  const description = formData.get('description') as string

  await db.property.create({
    data: {
      name,
      slug,
      image,
      hot,
      virtualRoomUrl: virtualRoomUrl || null,
      brosurUrl: brosurUrl || null,
      description: description || null,
    },
  })

  revalidatePath('/properties')
  revalidatePath('/admin/property')
  redirect('/admin/property')
}

export async function updateProperty(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const image = formData.get('image') as string
  const hot = formData.get('hot') === 'on'
  const virtualRoomUrl = formData.get('virtualRoomUrl') as string
  const brosurUrl = formData.get('brosurUrl') as string
  const description = formData.get('description') as string

  await db.property.update({
    where: { id },
    data: {
      name,
      slug,
      image,
      hot,
      virtualRoomUrl: virtualRoomUrl || null,
      brosurUrl: brosurUrl || null,
      description: description || null,
    },
  })

  revalidatePath('/properties')
  revalidatePath(`/properties/${slug}`)
  revalidatePath('/admin/property')
  redirect('/admin/property')
}

export async function deleteProperty(id: string) {
  await db.property.delete({
    where: { id },
  })

  revalidatePath('/properties')
  revalidatePath('/admin/property')
}

// Property Type Actions
export async function createPropertyType(propertyId: string, formData: FormData) {
  const type = formData.get('type') as string
  const bedrooms = parseInt(formData.get('bedrooms') as string) || 0
  const bathrooms = parseInt(formData.get('bathrooms') as string) || 0
  const carPack = parseInt(formData.get('carPack') as string) || 0
  const images = formData.get('images') as string // JSON string array
  const specs = formData.get('specs') as string // JSON string object

  await db.propertyType.create({
    data: {
      propertyId,
      type,
      bedrooms,
      bathrooms,
      carPack,
      images: images || null,
      specs: specs || null,
    },
  })

  const property = await db.property.findUnique({ where: { id: propertyId } })
  if (property) {
    revalidatePath(`/properties/${property.slug}`)
  }
  revalidatePath(`/admin/property/edit/${propertyId}`)
}

export async function deletePropertyType(typeId: string, propertyId: string) {
  await db.propertyType.delete({
    where: { id: typeId },
  })

  const property = await db.property.findUnique({ where: { id: propertyId } })
  if (property) {
    revalidatePath(`/properties/${property.slug}`)
  }
  revalidatePath(`/admin/property/edit/${propertyId}`)
}
