// import { NextResponse } from 'next/server';

// export async function middleware(req: any) {

//   const res = NextResponse.next();
//   const auth0Token = req.cookies.get(process.env.NEXT_PUBLIC_AUTH0_IS_AUTHENTICATED);

//   if (!auth0Token?.value) {
//     const loginUrl = new URL('/login', req.url);
//     return NextResponse.redirect(loginUrl);
//   }
//   return res;
// }

// export const config = {
//   matcher: ['/profile','/carts', '/orders', '/checkout', '/orders-details'],
// };

import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ["/middleware", "/carts", "/orders", "/checkout", "/orders-details"],
};