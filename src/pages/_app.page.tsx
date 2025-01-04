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
import { UserProvider, useUser } from "@/contexts/user";
import { CheckoutProvider } from "@/contexts/checkout";
import { CountriesProvider } from "@/contexts/countries";
import { OrdersDetailsProvider } from "@/contexts/orders-details";
import { NoSsr } from "@mui/material";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { SellerDetailsProvider } from "@/contexts/seller-details";
import useBeforeLeave from "@/hooks/use-befor-leave";
import { useNavigation } from "@/hooks/useNavigation";
import { RoutesUrls } from "@/utils/enums/routesUrl";
import React from "react";
import sessionManager from '@/utils/session-manager';
import { useUserInfo } from "@/hooks/use-user-info";
import { get } from "lodash";

export default function App({ Component, pageProps }: AppProps) {
    const {dispatch: userDispatch} =useUser();
    const {
      getAccessTokenSilently,
      isAuthenticated,
  } = useAuth0();
    const {
      handleBecomeSeller,
      getUserInfo,
      user: userInfos,
      isLoading: userInfosLoader,
      modalTerm,
      token,
      setModalTerm
    } = useUserInfo();

  const {redirect} = useNavigation();

    const setSession = async() => {
      const token = await getAccessTokenSilently();
      console.log('token', token);
      if(token){
        userDispatch({ type: 'SET_TOKEN', value: token });
        sessionManager.setSession(token);
        getUserInfo();
      }
    }
  

  useBeforeLeave((url) => {
    if(url && url !== RoutesUrls.Login) {
      localStorage.setItem("lastUrl", url);
    }
  });

  function onRedirectCallback() {
    const getRedirectUrl = localStorage.getItem("lastUrl");

    const redirectUrl = getRedirectUrl
    ? `${window.location.origin}${getRedirectUrl}`
    : window.location.origin;

    redirect(redirectUrl as RoutesUrls);
  }

  React.useEffect(() => {
    if(!isAuthenticated) {
      setSession();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

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
          </CountriesProvider>
        </NoSsr>
      </I18nextProvider>
    </>
  )

}
