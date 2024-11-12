import { NextResponse } from 'next/server';

export async function middleware(req: any) {

  const res = NextResponse.next();
  const token1 = req.cookies.get('nuvann-valid-token');
  const token2 = req.cookies.get('auth0.BvVWpwUjzMrzvRhM7qpWZQ8XHO79OKiL.is.authenticated');

  if (!token1 || !token2) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
  return res;
}

export const config = {
  matcher: ['/profile','/carts', '/orders', '/checkout', '/orders-details'],
};
