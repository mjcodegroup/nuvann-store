import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import logo from '../../../public/logo.svg';
import NavList from './nav-list';
import NavOptions from './nav-options';
import Styles from './navbar.module.scss';
import SearchBar from './search-bar';
import { useCartInfo } from '@/hooks/use-cart-info';
import { useCategoriesInfo } from '@/hooks/use-categories-info';
import ModalActions from '../modal-actions';
import CustomInput from '../custom-input';
import CustomSelect from '../custom-select';
import { useUserInfo } from '@/hooks/use-user-info';
import { useCountriesInfo } from '@/hooks/use-countries-info';
import { formatCountriesArray } from '@/utils/format-countries-array';
import { UserRoles } from '@/utils/enums/user.enum';
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { Category } from '@/contexts/categories/types';
import { useRouter } from 'next/router';
import getDeviceType from '@/utils/get-device-type';
import MobileNavbar from './mobile-navbar';
import { useAuth0 } from "@auth0/auth0-react";

interface selectedCountry {
  label: string;
  value: string;
}
export const Navbar: React.FC = () => {
  const { t } = useTranslation("home");
  const { getIdTokenClaims, user, isLoading: loading, logout, isAuthenticated, loginWithPopup: handleLogin } = useAuth0();
  const {countries} = useCountriesInfo();
  const {
    handleBecomeSeller,
    getUserInfo,
    user: userInfos,
    isLoading: userInfosLoader,
    modalTerm,
    setModalTerm
  } = useUserInfo();
  const { cartState} = useCartInfo();
  const { categoriesState} = useCategoriesInfo();
  const [businessName, setBusinessName] = React.useState<string>("");
  const [selectedCountry, setSelectedCountry] = React.useState<selectedCountry[] | any>([]);
  const { redirect } = useNavigation();

  const router = useRouter();
  const { search } = router.query;

  const handleClickToBecomeSeller = () => {
    if(!isAuthenticated) {
      return handleLogin();
    }
    if(userInfos.roles.includes(UserRoles.SELLER)) {
      return window.location.href = process.env.NEXT_PUBLIC_DASHBOARD_ACCESS_URL as string;
    }
    setModalTerm(true)
  }

  React.useEffect(() => {
    if(Object?.keys(userInfos)?.length === 0 && isAuthenticated) {
      getUserInfo();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [isAuthenticated]);

  const handleRedirectToCategory = (category: Category) => {
    redirect(`/search?category_id=${category.id}` as RoutesUrls);
  }

  const handleSearch = (searchText: string) => {
    redirect(`/search?search=${searchText}` as RoutesUrls)
  }

  const getToken = async () => {
    const token = await getIdTokenClaims()
    console.log("_________________________-", token?.__raw)
    return token?.__raw
  }

  useEffect(() => {
    getToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>

    {
      getDeviceType.isMobile() ?
        <MobileNavbar
          categories={categoriesState?.categories}
          onCategorySelect={handleRedirectToCategory}
          onClickSellerMenu={()=>handleClickToBecomeSeller()}
          isAuthenticated={isAuthenticated}
          user={userInfos.name? userInfos : user}
          onSignIn={handleLogin}
          isLoading={loading}
          onLogout={logout}
          cartCount={cartState.cart?.count}
          onSearch={handleSearch}
          onClickMenu={()=>{}}
          width='100%'
        /> 
      :
      (
      <div className={Styles.navbar_container_principal}>
        <div className={Styles.nav_header}>
          <Link href="/">
            <Image src={logo} alt="nuvann.com" />
          </Link>
          <div className={Styles.navbar_search}>
            <SearchBar
              defaultValue={search as string}
              onSearch={handleSearch}
            />
          </div>
          <NavOptions
            user={userInfos.name? userInfos : user}
            isAuthenticated={isAuthenticated}
            onSignIn={handleLogin}
            isLoading={loading}
            onLogout={logout}
            cartCount={cartState.cart?.count}
          />
        </div>
        <NavList
          width='100%'
          categories={categoriesState?.categories}
          onCategorySelect={handleRedirectToCategory}
          onClickSellerMenu={()=>handleClickToBecomeSeller()}
          isAuthenticated={isAuthenticated}
        />
      </div>
      ) 

    }
    <ModalActions
      title={t('home.term_and_contitions')}
      open ={modalTerm}
      setOpen= {setModalTerm}
      loading={userInfosLoader}
      disable={!businessName || !selectedCountry.code}
      onClickBtnConfirm= {(): void =>{
        handleBecomeSeller({
          business_name: businessName,
          country: selectedCountry
        })
      }}
    >
      <CustomInput label={t('home.business_name')} type='text' value={businessName} onChange={(e: any) =>setBusinessName(e)} />
      <CustomSelect options={countries.length && formatCountriesArray(countries) as any} onSelect={(e)=> setSelectedCountry(e)} title={t('home.country')} />
    </ModalActions>
    </>
  );
};
