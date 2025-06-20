import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true') {
    return NextResponse.next();
  }
  const loggedIn = req.cookies.get('loggedIn')?.value === 'true';
  if (!loggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'],
};
