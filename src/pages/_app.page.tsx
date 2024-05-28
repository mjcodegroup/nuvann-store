import type { AppProps } from "next/app";
import React from "react";

import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })
import '../styles/globals.scss'

import "@/utils/i18starter/index"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
      html {
        font-family: ${inter.style.fontFamily};
      }
    `}</style>
      
      <Component {...pageProps}/>;
    </>
)
  
}
