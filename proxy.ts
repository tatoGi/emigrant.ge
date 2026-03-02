import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude static files, images, api routes, and favicon
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
