import { useAuth0 } from '@auth0/auth0-react';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {

  const res = NextResponse.next();
  const token = req.cookies.get('@nuvann:valid-token').value;
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
  return res;
}

export const config = {
  matcher: ['/carts', '/orders', "/checkout"],
};
