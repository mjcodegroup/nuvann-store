import type { AppProps } from "next/app";

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import '../styles/globals.scss';
 
import { I18nextProvider, getI18n } from "react-i18next";
import { AuthProvider } from "@/hooks/useKeycloak";
import { ProductsProvider } from "@/contexts/products";
import { CartProvider } from "@/contexts/cart";
import { CategoriesProvider } from "@/contexts/categories";
import ToastProvider from "@/contexts/toast";
import { UserProvider } from "@/contexts/user";
import { CheckoutProvider } from "@/contexts/checkout";
import i18n from "../../i18n/i18n";
import cookie from "@/utils/cookie";
import { Suspense } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <AuthProvider >
        <I18nextProvider i18n={i18n}>
          <UserProvider>
          <ProductsProvider>
            <ToastProvider>
              <CategoriesProvider>
                <CartProvider>
                  <CheckoutProvider>
                      <Component {...pageProps}/>
                  </CheckoutProvider>
                </CartProvider>
              </CategoriesProvider>
            </ToastProvider>
          </ProductsProvider>
          </UserProvider>
        </I18nextProvider>
      </AuthProvider>
    </>
  )
  
}
