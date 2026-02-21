import { notFound } from 'next/navigation'
import { areas } from '@/data/areas'
import type { Metadata } from 'next'
import { PropertyDetailClient } from '@/components/PropertyDetailClient'
import { GoogleMapSection } from '@/components/GoogleMapSection'
import { Ctaformpromo } from '@/components/CtaFormPromo'

interface Props {
    params: Promise<{ slug: string }>
}

function getArea(slug: string) {
    return areas.find(area => area.slug === slug)
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const area = getArea(slug)

    if (!area) {
        return {
            title: 'Properti Tidak Ditemukan'
        }
    }

    return {
        title: `${area.name} - Rumah Bintaro`,
        description: `Lihat detail properti ${area.name} dengan berbagai pilihan tipe. Tersedia ${area.products.length} tipe unit.`,
        openGraph: {
            title: `${area.name} - Rumah Bintaro`,
            description: `Lihat detail properti ${area.name} dengan berbagai pilihan tipe.`,
            type: 'article',
            images: area.image ? [{ url: area.image, width: 1200, height: 630 }] : [],
            locale: 'id_ID',
        },
    }
}

export default async function PropertyDetailPage({ params }: Props) {
    const { slug } = await params
    const area = getArea(slug)

    if (!area) {
        notFound()
    }

    return (
        <>
            <PropertyDetailClient area={area} />
            <Ctaformpromo />
            <GoogleMapSection />
        </>
    )
}

// Generate static params for all areas
export function generateStaticParams() {
    return areas.map((area) => ({
        slug: area.slug,
    }))
}
