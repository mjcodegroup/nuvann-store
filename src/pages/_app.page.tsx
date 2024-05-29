import type { AppProps } from "next/app";
import React from "react";

import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })
import '../styles/globals.scss'

import "@/utils/i18starter/index"
import { I18nextProvider, getI18n } from "react-i18next";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <I18nextProvider i18n={getI18n()}>
        <Component {...pageProps}/>;
      </I18nextProvider>
    </>
  )
  
}
