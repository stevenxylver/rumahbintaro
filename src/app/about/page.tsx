import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tentang Kami',
    description: 'Kenali Rumah Bintaro lebih dekat. Kami adalah mitra terpercaya Anda untuk menemukan hunian dan investasi terbaik di kawasan Bintaro Jaya.',
}

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        Menemukan <span className="text-blue-600">Rumah</span> Impian <br className="hidden md:block" /> di Kawasan Terbaik
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Rumah Bintaro hadir sebagai solusi komprehensif bagi Anda yang mencari hunian eksklusif, nyaman, dan bernilai investasi tinggi di jantung Bintaro Jaya.
                    </p>
                </div>
            </section>

            {/* Why Us */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Mengapa Memilih Rumah Bintaro?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-gray-800 rounded-2xl hover:bg-gray-750 transition-colors">
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="text-xl font-bold mb-3">Kualitas Terjamin</h3>
                            <p className="text-gray-400">Setiap unit yang kami pasarkan telah melalui proses seleksi ketat untuk kualitas bangunan dan legalitas.</p>
                        </div>
                        <div className="p-8 bg-gray-800 rounded-2xl hover:bg-gray-750 transition-colors">
                            <div className="text-4xl mb-4">📍</div>
                            <h3 className="text-xl font-bold mb-3">Lokasi Premium</h3>
                            <p className="text-gray-400">Fokus kami pada kawasan Bintaro memastikan Anda mendapatkan akses terbaik ke fasilitas perkotaan.</p>
                        </div>
                        <div className="p-8 bg-gray-800 rounded-2xl hover:bg-gray-750 transition-colors">
                            <div className="text-4xl mb-4">👤</div>
                            <h3 className="text-xl font-bold mb-3">Pelayanan Personal</h3>
                            <p className="text-gray-400">Tim kami siap mendampingi Anda dari proses pencarian hingga serah terima unit secara profesional.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
