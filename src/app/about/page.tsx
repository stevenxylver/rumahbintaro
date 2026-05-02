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
            <section className="relative py-24 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-[0.2em] mb-8 border border-blue-100/50">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                        Rumah Bintaro
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                        Menemukan <span className="text-blue-600">Rumah</span> Impian <br className="hidden md:block" /> di Kawasan Terbaik
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Rumah Bintaro hadir sebagai solusi komprehensif bagi Anda yang mencari hunian eksklusif, nyaman, dan bernilai investasi tinggi di jantung Bintaro Jaya.
                    </p>
                </div>
            </section>

            {/* Why Us */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                            Mengapa Memilih <span className="text-blue-600">Rumah Bintaro?</span>
                        </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                🏆
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Kualitas Terjamin</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Setiap unit yang kami pasarkan telah melalui proses seleksi ketat untuk kualitas bangunan dan legalitas.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                📍
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Lokasi Premium</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Fokus kami pada kawasan Bintaro memastikan Anda mendapatkan akses terbaik ke fasilitas perkotaan.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                👤
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Pelayanan Personal</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Tim kami siap mendampingi Anda dari proses pencarian hingga serah terima unit secara profesional.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
