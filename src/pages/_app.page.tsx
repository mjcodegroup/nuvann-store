import type { AppProps } from "next/app";
import React from "react";

import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })
import '../styles/globals.scss'

import "@/utils/i18starter/index"
import { I18nextProvider, getI18n } from "react-i18next";
import { UserProvider } from '@auth0/nextjs-auth0/client';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <I18nextProvider i18n={getI18n()}>
      <UserProvider i18nIsDynamicList>
        <Component {...pageProps}/>;
      </UserProvider>
      </I18nextProvider>
    </>
  )
  
}
