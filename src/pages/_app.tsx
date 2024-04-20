import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

import "@/utils/i18starter/index"
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
