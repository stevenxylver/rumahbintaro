import { notFound } from 'next/navigation'
import db from '@/lib/db'
import type { Metadata } from 'next'
import { KavlingDetailClient } from '@/components/KavlingDetailClient'
import { GoogleMapSection } from '@/components/GoogleMapSection'
import { FacilitiesSectionWrapper } from '@/components/FacilitiesSectionWrapper'
import { Ctaformpromo } from '@/components/CtaFormPromo'

interface Props {
    params: Promise<{ slug: string }>
}

export const dynamicParams = true

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const kavling = await db.kavling.findUnique({ where: { slug } })

    if (!kavling) {
        return {
            title: 'Kavling Tidak Ditemukan'
        }
    }

    return {
        title: `${kavling.name} - ${kavling.size} - Rumah Bintaro`,
        description: kavling.description || `Tanah kavling ${kavling.name} seluas ${kavling.size} di kawasan Bintaro. Siap bangun dengan sertifikat SHM.`,
        openGraph: {
            title: `${kavling.name} - Rumah Bintaro`,
            description: kavling.description || `Tanah kavling ${kavling.name} seluas ${kavling.size} di kawasan Bintaro.`,
            type: 'article',
            images: kavling.image ? [{ url: kavling.image, width: 1200, height: 630 }] : [],
            locale: 'id_ID',
        },
    }
}

export default async function KavlingDetailPage({ params }: Props) {
    const { slug } = await params
    const kavling = await db.kavling.findUnique({ where: { slug } })

    if (!kavling) {
        notFound()
    }

    // Parse images safely
    let parsedImages = []
    try {
        parsedImages = kavling.images ? JSON.parse(kavling.images) : []
    } catch (e) {
        console.error('Failed to parse kavling images:', e)
    }

    const kavlingWithImages = {
        ...kavling,
        description: kavling.description ?? undefined,
        images: Array.isArray(parsedImages) ? parsedImages : [],
    }

    return (
        <>
            <KavlingDetailClient kavling={kavlingWithImages} />

            <GoogleMapSection />
            <FacilitiesSectionWrapper />
            <Ctaformpromo />
        </>
    )
}

// Generate static params for all kavlings
export async function generateStaticParams() {
    const kavlings = await db.kavling.findMany({ select: { slug: true } })
    return kavlings.map((k) => ({
        slug: k.slug,
    }))
}
