import type { AppProps } from "next/app";

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import '../styles/globals.scss';
 
import { I18nextProvider } from "react-i18next";
import { AuthProvider } from "@/hooks/useKeycloak";
import { ProductsProvider } from "@/contexts/products";
import { CartProvider } from "@/contexts/cart";
import { OrdersProvider } from "@/contexts/orders";
import { CategoriesProvider } from "@/contexts/categories";
import ToastProvider from "@/contexts/toast";
import { UserProvider } from "@/contexts/user";
import { CheckoutProvider } from "@/contexts/checkout";
import i18n from "../../i18n/i18n";
import { CountriesProvider } from "@/contexts/countries";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
        <I18nextProvider i18n={i18n}>
          <CountriesProvider>
            <AuthProvider >
              <UserProvider>
              <ProductsProvider>
                <ToastProvider>
                  <CategoriesProvider>
                    <CartProvider>
                      <CheckoutProvider>
                        <OrdersProvider>
                        <Component {...pageProps}/>
                        </OrdersProvider>
                      </CheckoutProvider>
                    </CartProvider>
                  </CategoriesProvider>
                </ToastProvider>
              </ProductsProvider>
              </UserProvider>
            </AuthProvider>
          </CountriesProvider>
        </I18nextProvider>
    </>
  )
  
}
