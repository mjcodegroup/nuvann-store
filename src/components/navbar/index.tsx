import { useKeycloak } from '@/hooks/useKeycloak';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../../public/logo.svg';
import NavList from './nav-list';
import NavOptions from './nav-options';
import Styles from './navbar.module.scss';
import SearchBar from './search-bar';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const { authenticated, keycloak, isLoading } = useKeycloak();

  console.log('isAuthenticated', authenticated);

 console.log('keycloak', keycloak);

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
          user={null}
          isAuthenticated={false}
          //onSignIn={login}
          isLoading={false}
          //onLogout={logout}
        />
      </div>
      <NavList />
    </div>
  );
};
