import type { AppProps } from "next/app";

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })


import '../styles/globals.scss';
 

import "@/utils/i18starter/index";
import { I18nextProvider, getI18n } from "react-i18next";
import { KeycloakProvider } from "@/hooks/useKeycloak";
import { AuthProvider } from "react-oidc-context";


const oidcConfig = {
  authority: "https://keycloak.mjcodegroup.com/realms/nuvann",
  client_id: "nuvann-store",
  redirect_uri: "http://localhost:3000",
};

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      {/* <KeycloakProvider> */}
        <AuthProvider {...oidcConfig}>
          <I18nextProvider i18n={getI18n()}>
              <Component {...pageProps}/>
          </I18nextProvider>
        </AuthProvider>
      {/* </KeycloakProvider> */}
    </>
  )
  
}
