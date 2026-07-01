import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin — allow /admin-login through
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin-login')) {
    const isAdmin = request.cookies.get('admin_session')?.value === 'anime_hub_admin_2026'
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
