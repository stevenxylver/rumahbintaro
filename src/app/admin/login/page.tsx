'use client'

import { login } from '@/lib/actions/auth'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 mt-2">Enter password to manage blog articles</p>
        </div>

        <form 
          action={async (formData) => {
            const result = await login(formData)
            if (result?.error) setError(result.error)
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
