'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createPromo(data: { title?: string, image: string }) {
    await db.promo.create({
        data
    })
    revalidatePath('/')
    revalidatePath('/admin/promo')
}

export async function deletePromo(id: string) {
    await db.promo.delete({
        where: { id }
    })
    revalidatePath('/')
    revalidatePath('/admin/promo')
}
export async function updatePromo(id: string, data: { title?: string, image: string }) {
    await db.promo.update({
        where: { id },
        data
    })
    revalidatePath('/')
    revalidatePath('/admin/promo')
}

export async function getPromos() {
    return await db.promo.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5 // Take latest 5 for popup
    })
}
