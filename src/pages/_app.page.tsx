import type { AppProps } from "next/app";

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import '../styles/globals.scss';
 
import "@/utils/i18starter/index";
import { I18nextProvider, getI18n } from "react-i18next";
import { AuthProvider } from "@/hooks/useKeycloak";
import { ProductsProvider } from "@/contexts/products";
import { CartProvider } from "@/contexts/cart";
import { OrdersProvider } from "@/contexts/orders";
import { CategoriesProvider } from "@/contexts/categories";
import ToastProvider from "@/contexts/toast";
import { UserProvider } from "@/contexts/user";
import { CheckoutProvider } from "@/contexts/checkout";
import { CountriesProvider } from "@/contexts/countries";
import { OrdersDetailsProvider } from "@/contexts/orders-details";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
        <I18nextProvider i18n={getI18n()} defaultNS={'fr'}>
          <CountriesProvider>
            <AuthProvider >
              <UserProvider>
              <ProductsProvider>
                <ToastProvider>
                  <CategoriesProvider>
                    <CartProvider>
                      <CheckoutProvider>
                        <OrdersProvider>
                        <OrdersDetailsProvider>
                        <Component {...pageProps}/>
                        </OrdersDetailsProvider>
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
