import React from 'react'
import Styles from './navbar.module.scss'
import Link from 'next/link'
import logo from "../../../public/logo.svg"
import Image from 'next/image'
import SearchBar from './search-bar'
import { useTranslation } from 'react-i18next'
import NavList from './nav-list'
import NavOptions from './nav-options'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar: React.FC = () => {
    const { t } = useTranslation();

    const { loginWithRedirect, user, isAuthenticated, isLoading, logout } = useAuth0();


    return (
        <div className={Styles.navbar_container_principal}>
            <div className={Styles.nav_header}>
                <Link href="/">
                    <Image src={logo} alt="nuvann.com" />
                </Link>
                <div className={Styles.navbar_search}>
                    <SearchBar placeholder={t('home.searchForAProduct')} onSearch={()=> console.log("searching")}/>
                </div>
                <NavOptions
                    user={user}
                    isAuthenticated={isAuthenticated}
                    onSignIn={loginWithRedirect}
                    isLoading={isLoading}
                    onLogout={logout}
                />
            </div>
            <NavList />
        </div>
    )
}