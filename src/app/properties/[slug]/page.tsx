import { notFound } from 'next/navigation'
import db from '@/lib/db'
import type { Metadata } from 'next'
import { PropertyDetailClient } from '@/components/PropertyDetailClient'
import { GoogleMapSection } from '@/components/GoogleMapSection'
import { Ctaformpromo } from '@/components/CtaFormPromo'
import { FacilitiesSectionWrapper } from '@/components/FacilitiesSectionWrapper'

interface Props {
    params: Promise<{ slug: string }>
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const area = await db.property.findUnique({
        where: { slug },
        include: { products: true }
    })

    if (!area) {
        return {
            title: 'Properti Tidak Ditemukan'
        }
    }

    return {
        title: `${area.name} - Rumah Bintaro`,
        description: area.description || `Lihat detail properti ${area.name} dengan berbagai pilihan tipe. Tersedia ${area.products.length} tipe unit.`,
        openGraph: {
            title: `${area.name} - Rumah Bintaro`,
            description: area.description || `Lihat detail properti ${area.name} dengan berbagai pilihan tipe.`,
            type: 'article',
            images: area.image ? [{ url: area.image, width: 1200, height: 630 }] : [],
            locale: 'id_ID',
        },
    }
}

export default async function PropertyDetailPage({ params }: Props) {
    const { slug } = await params
    const area = await db.property.findUnique({
        where: { slug },
        include: { products: true }
    })

    if (!area || !area.products) {
        notFound()
    }

    // Safely parse JSON strings
    const safeParse = (str: string | null | undefined, fallback: any = []) => {
        if (!str) return fallback
        try {
            return JSON.parse(str)
        } catch (e) {
            console.error('JSON parse error:', e)
            return fallback
        }
    }

    // Map database models to match the expected Client Component interface
    const mappedArea = {
        ...area,
        images: safeParse(area.images),
        products: area.products.map(p => ({
            ...p,
            images: safeParse(p.images),
            ...(safeParse(p.specs, {}))
        }))
    }

    return (
        <>
            {/* @ts-ignore - mapping result might have slightly different strict types but compatible at runtime */}
            <PropertyDetailClient area={mappedArea} />
            <Ctaformpromo />
            <FacilitiesSectionWrapper />
            <GoogleMapSection />
        </>
    )
}

// Generate static params for all areas
export async function generateStaticParams() {
    const areas = await db.property.findMany({ select: { slug: true } })
    return areas.map((area) => ({
        slug: area.slug,
    }))
}
