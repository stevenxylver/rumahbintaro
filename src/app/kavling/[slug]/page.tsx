import { notFound } from 'next/navigation'
import { kavlings } from '@/data/kavlings'
import type { Metadata } from 'next'
import { KavlingDetailClient } from '@/components/KavlingDetailClient'
import { GoogleMapSection } from '@/components/GoogleMapSection'
import { FacilitiesSection } from '@/components/FacilitiesSection'

interface Props {
    params: Promise<{ slug: string }>
}

function getKavling(slug: string) {
    return kavlings.find(k => k.slug === slug)
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const kavling = getKavling(slug)

    if (!kavling) {
        return {
            title: 'Kavling Tidak Ditemukan'
        }
    }

    return {
        title: `${kavling.name} - ${kavling.size} - Rumah Bintaro`,
        description: `Tanah kavling ${kavling.name} seluas ${kavling.size} di kawasan Bintaro. Siap bangun dengan sertifikat SHM.`,
        openGraph: {
            title: `${kavling.name} - Rumah Bintaro`,
            description: `Tanah kavling ${kavling.name} seluas ${kavling.size} di kawasan Bintaro.`,
            type: 'article',
            images: kavling.image ? [{ url: kavling.image, width: 1200, height: 630 }] : [],
            locale: 'id_ID',
        },
    }
}

export default async function KavlingDetailPage({ params }: Props) {
    const { slug } = await params
    const kavling = getKavling(slug)

    if (!kavling) {
        notFound()
    }

    return (
        <>
            <KavlingDetailClient kavling={kavling} />
            <GoogleMapSection />
            <FacilitiesSection />
        </>
    )
}

// Generate static params for all kavlings
export function generateStaticParams() {
    return kavlings.map((k) => ({
        slug: k.slug,
    }))
}
