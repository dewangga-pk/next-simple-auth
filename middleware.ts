import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from "./auth";

export async function middleware(request: NextRequest) {
  const currentUser = await getSession()
  
  if (!currentUser && request.nextUrl.pathname.startsWith('/profile')) {
    return Response.redirect(new URL('/login', request.url))
  }
  if (currentUser && !request.nextUrl.pathname.startsWith('/profile')) {
    return Response.redirect(new URL('/profile', request.url))
  }
}

export const config = {
  matcher: ['/((?!api||_next/static|_next/image|.*\\.png$).*)'],
}