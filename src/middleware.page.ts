import { useAuth0 } from '@auth0/auth0-react';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {

  const res = NextResponse.next();
  const token = req.cookies.get('auth0.BvVWpwUjzMrzvRhM7qpWZQ8XHO79OKiL.is.authenticated');

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

// Utilize apenas o matcher no config para definir as rotas privadas
export const config = {
  matcher: ['/carts', '/orders'], // Defina aqui as rotas privadas diretamente
};
