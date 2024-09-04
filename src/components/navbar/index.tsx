import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../../public/logo.svg';
import NavList from './nav-list';
import NavOptions from './nav-options';
import Styles from './navbar.module.scss';
import SearchBar from './search-bar';
import { useAuth } from '@/hooks/useKeycloak';
import { useCart } from '@/contexts/cart';
import { useCartInfo } from '@/hooks/use-cart-info';

export const Navbar: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { isAuthenticated, user, logout, handleLogin, loading} = useAuth();
  const {state: cartState, dispatch: cartDispatch} = useCart();
  const {getCart} = useCartInfo();
  const { t } = useTranslation();


  async function getStartedInformations() {
      setIsLoading(true)
    try {
        await getCart();
      } catch (error) {
        console.log("algo deu errado")
      } finally {
        setIsLoading(false)
      }
    }
    

useEffect(() => {
  if(isAuthenticated) getStartedInformations();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  return (
    <div className={Styles.navbar_container_principal}>
      <div className={Styles.nav_header}>
        <Link href="/">
          <Image src={logo} alt="nuvann.com" />
        </Link>
        <div className={Styles.navbar_search}>
          <SearchBar
            placeholder={t('home.searchForAProduct')}
            onSearch={() => console.log('searching')}
          />
        </div>
        <NavOptions
          user={user}
          isAuthenticated={isAuthenticated}
          onSignIn={handleLogin}
          isLoading={loading || isLoading}
          onLogout={logout}
          cartCount={cartState.cart?.count}
        />
      </div>
      <NavList />
    </div>
  );
};
