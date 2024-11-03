import React from 'react';
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
import sessionManager from '@/utils/session-manager';
import cookie from '@/utils/cookie';
import { generateRandomString } from '@/utils/generate-random-string';

interface selectedCountry {
  label: string;
  value: string;
}
export const Navbar: React.FC = () => {
  const { t } = useTranslation("home");
  const router = useRouter();
  const { search, becomeseller } = router.query;
  const {
      getAccessTokenSilently,
      user, isLoading: loading,
      logout, isAuthenticated,
      loginWithPopup: handleLogin
  } = useAuth0();
  const {countries} = useCountriesInfo();
  const {
    handleBecomeSeller,
    getUserInfo,
    user: userInfos,
    isLoading: userInfosLoader,
    modalTerm,
    setModalTerm
  } = useUserInfo();
  const { cartState} = useCartInfo({isAuthenticated: isAuthenticated});
  const { categoriesState} = useCategoriesInfo();
  const [businessName, setBusinessName] = React.useState<string>("");
  const [selectedCountry, setSelectedCountry] = React.useState<selectedCountry[] | any>([]);
  const { redirect } = useNavigation();


  const handleClickToBecomeSeller = () => {

    console.log(isAuthenticated)
    if(!isAuthenticated) {
      return handleLogin();
    }
    cookie.setCookie({name: 'nuvann_store_referral', days: 1, value: generateRandomString(24), domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ''});
    if(userInfos?.roles?.includes(UserRoles.SELLER)) {
      return window.location.href = process.env.NEXT_PUBLIC_DASHBOARD_ACCESS_URL as string;
    }

    console.log('click', userInfos)
    setModalTerm(true)
  }

  const handleRedirectToCategory = (category: Category) => {
    redirect(`/search?category_id=${category.id}` as RoutesUrls);
  }

  const handleSearch = (searchText: string) => {
    redirect(`/search?search=${searchText}` as RoutesUrls)
  }
  
  const setSession = async() => {
    const token = await getAccessTokenSilently();
    if(token){
      sessionManager.setSession(token);
    }
  }

  React.useEffect(() => {
    if(!isAuthenticated) return;
    setSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  React.useEffect(() => {
    if(Object?.keys(userInfos)?.length === 0 && isAuthenticated) {
      getUserInfo();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [isAuthenticated, userInfos]);

  React.useEffect(() => {
    if(becomeseller) {
      handleClickToBecomeSeller();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [becomeseller])

  

  return (
    <>

    {
      getDeviceType.isMobile() ?
        <MobileNavbar
          categories={categoriesState?.categories}
          onCategorySelect={handleRedirectToCategory}
          onClickSellerMenu={()=>handleClickToBecomeSeller()}
          isAuthenticated={isAuthenticated}
          user={user}
          onSignIn={handleLogin}
          isLoading={loading}
          onLogout={logout}
          cartCount={cartState.cart?.count}
          placeholder={t('searchForAProduct')}
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
              placeholder={t('searchForAProduct')}
              onSearch={handleSearch}
            />
          </div>
          <NavOptions
            user={user}
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
      title={t('term_and_contitions')}
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
      <CustomInput label={t('business_name')} type='text' value={businessName} onChange={(e: any) =>setBusinessName(e)} />
      <CustomSelect options={countries.length && formatCountriesArray(countries) as any} onSelect={(e)=> setSelectedCountry(e)} title={t('country')} />
    </ModalActions>
    </>
  );
};
