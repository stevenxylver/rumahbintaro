'use client'

import { PromoGallery, type PromoData } from './PromoGallery'
import { LeadForm } from './LeadForm'

export function Ctaformpromo({ promos = [] }: { promos?: PromoData[] | null }) {
    return (
        <section id="promo-form" className="bg-white py-16 px-4 md:px-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                {/* Bagian Gambar/Gallery Promo */}
                <PromoGallery promos={promos} />

                {/* Bagian Form Pendaftaran */}
                <LeadForm />
            </div>
        </section>
    )
}

