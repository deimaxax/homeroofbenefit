import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Get city and region from Vercel headers or fallback
  const city = request.geo?.city || 'Your Area'
  const region = request.geo?.region || 'US'
  const country = request.geo?.country || 'US'

  const response = NextResponse.next()

  // Set headers for the server components to read
  response.headers.set('x-user-city', city)
  response.headers.set('x-user-region', region)
  response.headers.set('x-user-country', country)

  return response
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
