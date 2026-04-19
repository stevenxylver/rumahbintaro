import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/images/Jaya_log_merah.webp"
                                    alt="Bintaro Jaya Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-800">
                                Bintaro Jaya
                            </span>
                        </div>
                        <p className="text-gray-600 max-w-md">
                            Mitra terpercaya Anda dalam menemukan hunian dan investasi properti terbaik di kawasan Bintaro — strategis, nyaman, dan bernilai tinggi.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Menu</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">Beranda</Link>
                            </li>
                            <li>
                                <Link href="/properties" className="text-gray-600 hover:text-blue-500 transition-colors">Properti</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Kontak</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+62 818-0818-7943(Liendra)</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>bintarojayarumah@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </footer>
    )
}

