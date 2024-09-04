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
import { useCategories } from '@/contexts/categories';
import { useCategoriesInfo } from '@/hooks/use-categories-info';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { isAuthenticated, user, logout, handleLogin, loading} = useAuth();
  const {state: cartState, dispatch: cartDispatch} = useCart();
  const {state: categoriesState, dispatch: categoriesDispatch} = useCategories();
  const {getCart} = useCartInfo();
  const {getCategories} = useCategoriesInfo();


  async function getStartedInformations() {
      setIsLoading(true)
    try {
      await getCategories();
      if(isAuthenticated){
        await getCart();
      } 
    } catch (error) {
      console.log("algo deu errado")
    } finally {
      setIsLoading(false)
    }
  }
  
  
  useEffect(() => {
    getStartedInformations();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuthenticated])

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
      <NavList
        width='100%'
        categories={categoriesState?.categories}
        onCategorySelect={(e: any)=>console.log(e)}/>
    </div>
  );
};
