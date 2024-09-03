import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export async function middleware(req: NextRequest) {
  const token = getCookie('access_token', { req });
  const url = req.nextUrl.clone();

  const keycloakLoginUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI}&response_type=code&scope=openid`;

  if (!token) {
    return NextResponse.redirect(keycloakLoginUrl);
  }

  const sessionValid = await verifySession(token);

  if (!sessionValid) {
    return NextResponse.redirect(keycloakLoginUrl);
  }

  // Limpa a URL dos parâmetros de consulta após o login
  if (url.search) {
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

async function verifySession(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.status === 200;
  } catch (error) {
    return false;
  }
}

export const config = {
  matcher: ['/carts'],
};
