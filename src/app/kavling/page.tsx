import { KavlingGridClient } from '@/components/KavlingGridClient'
import { kavlings } from '@/data/kavlings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Daftar Kavling',
    description: 'Jelajahi pilihan tanah kavling siap bangun di kawasan Bintaro dan sekitarnya dengan berbagai ukuran dan lokasi strategis.',
}

export default function KavlingPage() {
    return (
        <div className="min-h-screen bg-white">
            <KavlingGridClient kavlings={kavlings} />
        </div>
    )
}
