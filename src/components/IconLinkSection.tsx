'use client'

import Link from 'next/link'

const items = [
    {
        label: 'Properti',
        href: '/properties',
        icon: (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        label: 'Kavling',
        href: '/kavling',
        icon: (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        ),
    },
    {
        label: 'Hubungi Agen',
        href: 'https://wa.me/6281808187943',
        icon: (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        label: 'Kalkulator KPR',
        href: '/kpr-calculator',
        comingSoon: true,
        icon: (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3M13 3h5m0 0v5m0-5L10 11" />
                <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={1.5} />
            </svg>
        ),
    },
    {
        label: 'TikTok Live',
        href: 'https://www.tiktok.com/@bintarojaya47',
        comingSoon: true,
        icon: (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1-.07z" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/bintarojaya47',
        comingSoon: true,
        icon: (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },

]

export function IconLinkSection() {
    return (
        <section className="bg-white py-6 md:py-12 px-4 -mt-6 rounded-t-3xl md:rounded-none md:mt-0 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 md:mb-10">
                    <h2 className="text-xl md:text-4xl font-bold text-gray-900">
                        Mulai{' '}
                        <span className="text-blue-600">Perjalanan</span>
                        {' '}Hunian Anda
                    </h2>
                </div>

                <div className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-visible gap-6 md:gap-10 pb-2 md:pb-0 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {items.map((item) =>
                        item.comingSoon ? (
                            <div
                                key={item.label}
                                className="flex flex-col items-center gap-3 flex-shrink-0 w-20 md:flex-shrink md:w-28 cursor-not-allowed opacity-50"
                            >
                                <div className="relative w-[60px] h-[60px] md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shadow-sm">
                                    {item.icon}
                                    <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-tight whitespace-nowrap shadow">
                                        Soon
                                    </span>
                                </div>
                                <span className="text-xs md:text-sm text-gray-400 font-medium text-center leading-tight">
                                    {item.label}
                                </span>
                            </div>
                        ) : (
                            <Link
                                key={item.label}
                                href={item.href!}
                                className="flex flex-col items-center gap-3 group flex-shrink-0 w-20 md:flex-shrink md:w-28"
                            >
                                <div className="w-[60px] h-[60px] md:w-20 md:h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-200 shadow-sm">
                                    {item.icon}
                                </div>
                                <span className="text-xs md:text-sm text-gray-700 font-medium text-center leading-tight">
                                    {item.label}
                                </span>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </section>
    )
}
