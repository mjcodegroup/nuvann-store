import { Auth0Provider } from "@auth0/auth0-react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Auth0Provider
              domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL as string}
              clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
              authorizationParams={{
                audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                redirect_uri: typeof window !== "undefined" ? window.location.origin : '',
              }}
            >

      <body>
        <Main />
        <NextScript />
      </body>
            </Auth0Provider>
    </Html>
  );
}
