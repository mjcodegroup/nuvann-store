import { NextResponse } from 'next/server';

export async function middleware(req: any) {

  const res = NextResponse.next();
  const token = req.cookies.get('auth0.BvVWpwUjzMrzvRhM7qpWZQ8XHO79OKiL.is.authenticated');

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
  return res;
}

export const config = {
  matcher: ['/carts', '/orders', '/profile', '/checkout', '/orders-details'],
};
