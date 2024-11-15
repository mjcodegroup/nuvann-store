import type { AppProps } from "next/app";

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import '../styles/globals.scss';

import "@/utils/i18starter/index";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/i18n";
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
import { SellerDetailsProvider } from "@/contexts/seller-details";
import useBeforeLeave from "@/hooks/use-befor-leave";
import { useNavigation } from "@/hooks/useNavigation";
import { RoutesUrls } from "@/utils/enums/routesUrl";

export default function App({ Component, pageProps }: AppProps) {
  const {redirect} = useNavigation();

  useBeforeLeave((url) => {
    if(url !== RoutesUrls.Login) {
      localStorage.setItem("lastUrl", url);
    }
  });

  function onRedirectCallback(appState: any) {
    const getRedirectUrl = localStorage.getItem("lastUrl");
    redirect(window.location.origin + getRedirectUrl as RoutesUrls)
  }
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <I18nextProvider i18n={i18n}>
        <NoSsr>
          <CountriesProvider>
            <Auth0Provider
              domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL as string}
              clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
              authorizationParams={{
                audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                redirect_uri: typeof window !== "undefined" ? window.location.origin : '',
              }}
              onRedirectCallback={onRedirectCallback}
            >
              <UserProvider>
                <ProductsProvider>
                  <ToastProvider>
                    <CategoriesProvider>
                      <CartProvider>
                        <CheckoutProvider>
                          <OrdersProvider>
                            <OrdersDetailsProvider>
                              <SellerDetailsProvider>
                                <Component {...pageProps} />
                              </SellerDetailsProvider>
                            </OrdersDetailsProvider>
                          </OrdersProvider>
                        </CheckoutProvider>
                      </CartProvider>
                    </CategoriesProvider>
                  </ToastProvider>
                </ProductsProvider>
              </UserProvider>
            </Auth0Provider>
          </CountriesProvider>
        </NoSsr>
      </I18nextProvider>
    </>
  )

}
