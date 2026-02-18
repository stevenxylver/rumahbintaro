'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/dashboard'

    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Simple password check (for demo purposes)
        // In production, use proper authentication
        if (password === 'admin123') {
            // Set cookie
            document.cookie = 'admin_session=authenticated; path=/; max-age=86400'
            router.push(redirect)
        } else {
            setError('Password salah')
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Logo */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-3xl">R</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
                <p className="text-gray-600 mt-2">Masuk ke dashboard admin</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin}>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Admin
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Loading...' : 'Masuk'}
                </button>
            </form>

            {/* Hint */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                    <strong>Demo:</strong> Password default adalah <code className="bg-gray-200 px-2 py-1 rounded">admin123</code>
                </p>
            </div>
        </div>
    )
}

function LoginFormFallback() {
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <span className="text-white font-bold text-3xl">R</span>
                </div>
                <div className="h-8 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900 py-12 px-4">
            <div className="max-w-md w-full">
                <Suspense fallback={<LoginFormFallback />}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}
