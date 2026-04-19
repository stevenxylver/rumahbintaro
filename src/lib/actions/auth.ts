'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  const adminPassword = process.env.ADMIN_PASSWORD

  if (password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    redirect('/admin/blog')
  }

  return { error: 'Invalid password' }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    redirect('/admin/login')
}
