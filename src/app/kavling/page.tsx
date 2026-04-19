import { KavlingGridClient } from '@/components/KavlingGridClient'
import { Kavling } from '@/data/kavlings'
import db from '@/lib/db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Daftar Kavling',
    description: 'Jelajahi pilihan tanah kavling siap bangun di kawasan Bintaro dan sekitarnya dengan berbagai ukuran dan lokasi strategis.',
}

export default async function KavlingPage() {
    const kavlingsFromDb = await db.kavling.findMany({
        orderBy: { createdAt: 'desc' }
    })

    const kavlings = kavlingsFromDb.map(k => ({
        ...k,
        description: k.description ?? undefined,
        images: k.images ?? undefined,
    })) as Kavling[]

    return (
        <div className="min-h-screen bg-white">
            <KavlingGridClient kavlings={kavlings} />
        </div>
    )
}
