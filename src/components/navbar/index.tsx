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
import ModalActions from '../modal-actions';
import CustomInput from '../custom-input';
import CustomSelect from '../custom-select';
import { countriesMock } from '@/utils/mocks/home/countries.mock';
import { useUser } from '@/contexts/user';
import { useUserInfo } from '@/hooks/use-user-info';
import { set } from 'lodash';


interface selectedCountry {
  label: string;
  value: string;
}
export const Navbar: React.FC = () => {
  const { t } = useTranslation(["home, buttons"]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { isAuthenticated, user, logout, handleLogin, loading} = useAuth();
  const {handleBecomeSeller} = useUserInfo();
  const { state: userState, dispatch: userDispatch } = useUser();
  const {state: cartState, dispatch: cartDispatch} = useCart();
  const {state: categoriesState, dispatch: categoriesDispatch} = useCategories();
  const {getCart} = useCartInfo();
  const {getCategories} = useCategoriesInfo();
  const [businessName, setBusinessName] = React.useState<string>("");
  const [selectedCountry, setSelectedCountry] = React.useState<selectedCountry[] | any>([]);
  const [modalTerm, setModalTerm] = React.useState<boolean>(false);

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

  const handleClickToBecomeSeller = () => {
    if(userState.user.seller_infos) {
      return window.location.href = process.env.NEXT_PUBLIC_DASHBOARD_ACCESS_URL as string;
    }
    setModalTerm(true)
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
          user={userState.user || user}
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
        onCategorySelect={(e: any)=>console.log(e)}
        onClickSellerMenu={()=>handleClickToBecomeSeller()}
        isAuthenticated={isAuthenticated}
        />

        <ModalActions
          title={t('home.term_and_contitions')}
          open ={modalTerm}
          setOpen= {setModalTerm}
          loading={userState.isLoading}
          disable={!businessName || !selectedCountry.value}
          onClickBtnConfirm= {(): void =>{
            handleBecomeSeller({
              business_name: businessName,
              country: {
                code: selectedCountry.value,
                name: selectedCountry.label
              }
            })
          }}
        >
            <CustomInput label={t('home.business_name')} type='text' value={businessName} onChange={(e: any) =>setBusinessName(e)} />
            <CustomSelect options={countriesMock as any} onSelect={(e)=> setSelectedCountry(e)} title={t('home.country')} />
        </ModalActions>
    </div>
  );
};
