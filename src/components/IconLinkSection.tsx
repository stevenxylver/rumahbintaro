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
        label: 'Kalkulator KPR',
        href: '/kpr-calculator',
        icon: (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3M13 3h5m0 0v5m0-5L10 11" />
                <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={1.5} />
            </svg>
        ),
    },
    {
        label: 'Properti Pilihan',
        href: '/properties',
        icon: (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 11h6M9 15h4" />
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
]

export function IconLinkSection() {
    return (
        <section className="bg-white py-6 md:py-12 px-4 -mt-6 rounded-t-3xl md:rounded-none md:mt-0 relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* Title - centered, matches other sections */}
                <div className="text-center mb-6 md:mb-10">
                    <h2 className="text-xl md:text-4xl font-bold text-gray-900">
                        Mulai{' '}
                        <span className="text-blue-600">Perjalanan</span>
                        {' '}Hunian Anda
                    </h2>
                </div>

                {/* Icons — single scrollable row on mobile, centered wrap on desktop */}
                <div className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-visible gap-6 md:gap-10 pb-2 md:pb-0 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {items.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex flex-col items-center gap-3 group flex-shrink-0 w-20 md:flex-shrink md:w-28"
                        >
                            <div className="w-[60px] h-[60px] md:w-20 md:h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-200 shadow-sm">
                                {item.icon}
                            </div>
                            <span className="text-xs md:text-sm text-gray-700 font-medium text-center leading-tight">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
