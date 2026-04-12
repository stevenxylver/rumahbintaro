'use client'

import Image from 'next/image'

export function GoogleMapSection() {
    return (
        <section className="pt-8 pb-8 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-4 md:mb-12">
                    <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 whitespace-nowrap">
                        Lokasi Kami
                    </h2>
                    <p className="hidden md:block text-lg md:text-xl mt-4 text-gray-500">
                        Temukan properti impian Anda di Bintaro dan sekitarnya
                    </p>
                </div>

                {/* Map Image Container */}
                <div className="relative rounded-none md:rounded-3xl overflow-hidden md:shadow-2xl">
                    {/* Full Map Image - 3:2 aspect ratio for 1536x1024 */}
                    <div className="aspect-[3/2] relative">
                        <Image
                            src="/images/map.png"
                            alt="Lokasi Rumah Bintaro"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
