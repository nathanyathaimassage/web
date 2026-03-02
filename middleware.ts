import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Force Node.js runtime (not Edge) to avoid Netlify edge function crashes
export const runtime = 'nodejs'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // protect /admin/* except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminId = request.cookies.get('admin_id')
    if (!adminId) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
