import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../../public/logo.svg';
import NavList from './nav-list';
import NavOptions from './nav-options';
import Styles from './navbar.module.scss';
import SearchBar from './search-bar';
import { useKeycloakContext } from '@/hooks/useKeycloak';
import { useAuth } from "react-oidc-context";

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  // const { authenticated, isLoading, user, handleLogin, logout } = useKeycloakContext();

//   if (auth.isLoading) {
//     return <div>Loading...</div>;
// }
// if (auth.error) {
//   return <div>Oops... {auth.error.message}</div>;
// }

console.log(auth.user);

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
          user={auth.user?.profile}
          isAuthenticated={auth.isAuthenticated}
          onSignIn={() => void auth.signinRedirect()}
          isLoading={auth.isLoading}
          onLogout={() => void auth.signoutSilent()}
        />
      </div>
      <NavList />
    </div>
  );
};
