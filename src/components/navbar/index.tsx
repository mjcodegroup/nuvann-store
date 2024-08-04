import { redirectToLogin } from '@/utils/keycloak.login'
import { useAuth0 } from "@auth0/auth0-react"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import logo from "../../../public/logo.svg"
import NavList from './nav-list'
import NavOptions from './nav-options'
import Styles from './navbar.module.scss'
import SearchBar from './search-bar'

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
                    onSignIn={redirectToLogin}
                    isLoading={isLoading}
                    onLogout={logout}
                />
            </div>
            <NavList />
        </div>
    )
}