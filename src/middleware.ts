import { NextResponse, type NextRequest } from 'next/server'
import { verifyJWT } from '@/lib/jwt'

const PUBLIC_ROUTES = ['/', '/login', '/signup']
const COOKIE_NAME = 'auth-token'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes without auth
  const isPublic = PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/auth/')

  if (isPublic) {
    return NextResponse.next()
  }

  // Check JWT token
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  const payload = await verifyJWT(token)

  if (!payload) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect logged-in users away from auth pages
  if ((pathname === '/login' || pathname === '/signup') && payload) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
