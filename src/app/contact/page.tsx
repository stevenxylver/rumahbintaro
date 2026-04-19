import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Kontak Kami',
    description: 'Hubungi tim profesional Rumah Bintaro untuk konsultasi properti gratis. Kami siap membantu Anda menemukan hunian impian di Bintaro.',
}

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen pt-20">
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Punya pertanyaan mengenai unit tertentu atau butuh bantuan dalam mencari properti? Tim kami siap melayani Anda.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider border-l-4 border-blue-600 pl-4">Informasi Kontak</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl text-2xl">📱</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">WhatsApp (Liendra)</h3>
                                        <p className="text-gray-600 text-lg">+62 818-0818-7943</p>
                                        <a 
                                            href="https://wa.me/6281808187943"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 font-medium hover:underline inline-block mt-2"
                                        >
                                            Chat Sekarang ➜
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl text-2xl">✉️</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Email Resmi</h3>
                                        <p className="text-gray-600 text-lg">bintarojayarumah@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl text-2xl">🕒</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Jam Operasional</h3>
                                        <p className="text-gray-600">Senin - Minggu</p>
                                        <p className="text-gray-600">08:00 - 20:00 WIB</p>
                                        <p className="text-gray-500 text-sm mt-1 italic">*Melayani kunjungan lokasi dengan janji temu sebelumnya.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA / Map Placeholder */}
                        <div className="bg-blue-600 rounded-3xl p-10 text-white flex flex-col justify-center items-center text-center">
                            <h2 className="text-3xl font-bold mb-6">Siap Menemukan Rumah Anda?</h2>
                            <p className="text-blue-100 text-lg mb-8">
                                Jangan ragu untuk berdiskusi mengenai budget, lokasi favorit, atau simulasi KPR bersama tim kami.
                            </p>
                            <a 
                                href="https://wa.me/6281808187943?text=Halo, saya ingin konsultasi mengenai properti di Bintaro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full text-lg hover:bg-gray-100 transition-all shadow-xl"
                            >
                                Mulai Konsultasi Gratis
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
