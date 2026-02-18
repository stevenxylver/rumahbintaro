import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if the path starts with /dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Check for admin session (simple cookie check)
        const adminSession = request.cookies.get('admin_session')

        // If no session, redirect to login
        if (!adminSession || adminSession.value !== 'authenticated') {
            const loginUrl = new URL('/login', request.url)
            loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard/:path*'
}
