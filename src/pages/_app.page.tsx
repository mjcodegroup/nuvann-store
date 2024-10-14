import type { AppProps } from "next/app";

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import '../styles/globals.scss';
 
import "@/utils/i18starter/index";
import { I18nextProvider, getI18n } from "react-i18next";
import { ProductsProvider } from "@/contexts/products";
import { CartProvider } from "@/contexts/cart";
import { OrdersProvider } from "@/contexts/orders";
import { CategoriesProvider } from "@/contexts/categories";
import ToastProvider from "@/contexts/toast";
import { UserProvider } from "@/contexts/user";
import { CheckoutProvider } from "@/contexts/checkout";
import { CountriesProvider } from "@/contexts/countries";
import { OrdersDetailsProvider } from "@/contexts/orders-details";
import { NoSsr } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
        <I18nextProvider i18n={getI18n()} defaultNS={'fr'}>
          <NoSsr>
          <CountriesProvider>
            {/* <AuthProvider > */}
              <Auth0Provider
                domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL as string}
                clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
                authorizationParams={{
                  redirect_uri:  typeof window !== "undefined" ? window.location.origin : ''
                }}
              >
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
              </Auth0Provider>
            {/* </AuthProvider> */}
          </CountriesProvider>
          </NoSsr>
        </I18nextProvider>
    </>
  )
  
}
