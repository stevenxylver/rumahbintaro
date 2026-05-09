'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BankItem {
    id: string
    name: string
    logo: string
    order: number
}

export default function AdminBanksPage() {
    const [banks, setBanks] = useState<BankItem[]>([])
    const [name, setName] = useState('')
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetchBanks()
    }, [])

    const fetchBanks = async () => {
        const res = await fetch('/api/admin/banks')
        const data = await res.json()
        if (Array.isArray(data)) setBanks(data)
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !name.trim()) {
            setMessage('Isi nama bank terlebih dahulu!')
            return
        }

        setUploading(true)
        setMessage('')

        try {
            // Upload the image
            const formData = new FormData()
            formData.append('file', file)
            const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
            const uploadData = await uploadRes.json()

            if (uploadData.url) {
                // Create bank entry
                const res = await fetch('/api/admin/banks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name.trim(),
                        logo: uploadData.url,
                        order: banks.length
                    })
                })

                if (res.ok) {
                    setMessage('✅ Bank partner berhasil ditambahkan!')
                    setName('')
                    fetchBanks()
                    // Reset file input
                    e.target.value = ''
                } else {
                    setMessage('❌ Gagal menyimpan data bank')
                }
            } else {
                setMessage('❌ Gagal upload logo: ' + uploadData.error)
            }
        } catch (error: unknown) {
            setMessage('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Hapus bank partner ini?')) return

        try {
            const res = await fetch('/api/admin/banks', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })

            if (res.ok) {
                setMessage('✅ Bank partner berhasil dihapus!')
                fetchBanks()
            }
        } catch (error: unknown) {
            setMessage('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Bank Partner</h1>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Link href="/admin/property" className="text-blue-600 font-bold hover:underline">Properti</Link>
                        <Link href="/admin/kavling" className="text-blue-600 font-bold hover:underline">Kavling</Link>
                        <Link href="/admin/facility" className="text-blue-600 font-bold hover:underline">Fasilitas</Link>
                        <Link href="/admin/blog" className="text-blue-600 font-bold hover:underline">Blog</Link>
                        <Link href="/admin/promo" className="text-blue-600 font-bold hover:underline">Promo</Link>
                        <Link href="/admin/hero" className="text-blue-600 font-bold hover:underline">Hero</Link>
                        <Link href="/admin/promo-image" className="text-blue-600 font-bold hover:underline">Gambar Promo</Link>
                    </div>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-semibold ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message}
                    </div>
                )}

                {/* Add New Bank Form */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Tambah Bank Partner Baru</h2>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Bank</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Contoh: Bank BCA"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                disabled={uploading || !name.trim()}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100 disabled:opacity-50"
                            />
                        </div>
                    </div>
                    {uploading && <p className="mt-4 text-blue-600 font-semibold animate-pulse">⏳ Mengupload...</p>}
                </div>

                {/* Bank List */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Logo</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Nama Bank</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {banks.map((bank) => (
                                <tr key={bank.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="relative w-20 h-12 rounded-lg overflow-hidden border border-gray-200 bg-white">
                                            <Image src={bank.logo} alt={bank.name} fill className="object-contain p-1" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                        {bank.name}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(bank.id)}
                                            className="text-red-600 font-bold hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {banks.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                        Belum ada bank partner. Tambahkan yang pertama!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
