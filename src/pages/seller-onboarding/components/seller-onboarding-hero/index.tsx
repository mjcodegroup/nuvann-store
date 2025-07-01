import CustomButton from '@/components/custom-button';
import React from 'react';
import Styles from './hero.module.scss'
import { useUserInfo } from '@/hooks/use-user-info';
import ModalActions from '@/components/modal-actions';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import { useCountriesInfo } from '@/hooks/use-countries-info';
import { useTranslation } from 'react-i18next';
import { formatCountriesArray } from '@/utils/format-countries-array';
import cookie from '@/utils/cookie';
import { generateRandomString } from '@/utils/generate-random-string';
import { useAuth0 } from '@auth0/auth0-react';
import { UserRoles } from '@/utils/enums/user.enum';

interface selectedCountry {
  label: string;
  value: string;
}

const SellerOnboardingHero: React.FC = () => {
  const { t } = useTranslation("home");
  const {countries, loading} = useCountriesInfo();
  const {
    getAccessTokenSilently,
    user,
    logout, isAuthenticated,
    loginWithRedirect: handleLogin,
} = useAuth0();
const {
  getUserInfo,
  user: userInfos,
  isLoading: userInfosLoader,
  token,
} = useUserInfo();

    const {
      handleBecomeSeller,
      modalTerm,
      setModalTerm,
      isLoading,
    } = useUserInfo();

    const [businessName, setBusinessName] = React.useState<string>("");
    const [selectedCountry, setSelectedCountry] = React.useState<selectedCountry[] | any>([]);

    const handleClickBecomeSeller = async () => {
      if(!isAuthenticated) {
        return handleLogin();
      }
      cookie.setCookie({name: 'nuvann_store_referral', days: 1, value: generateRandomString(24), domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ''});
      if(Array.isArray(userInfos?.roles) && userInfos?.roles?.some(role => [UserRoles.SELLER, UserRoles.ADMINISTRATOR]?.includes(role))) {
        return window.open(process.env.NEXT_PUBLIC_DASHBOARD_ACCESS_URL as string, '_blank');
      }
      setModalTerm(true)
    }

  return (
    <div>
      <div className={Styles.seller_onboarding_hero}>
          <section className={Styles.hero_content}>
              <h1>{t('seller_hero_title')}</h1>
              <p>{t('seller_hero_desc')}</p>
              <CustomButton
                width={200}
                backgroundColor='#000052'
                onClick={() => handleClickBecomeSeller()}
              >
                {t('become_a_seller_button')}
              </CustomButton>
          </section>
          <section className={Styles.hero_image}>
          {/* Hero images */}
          </section>
      </div>

      <ModalActions
        title={t('term_and_contitions')}
        titleLink='https://faqs.nuvann.com/en/termes-et-conditions'
        open ={modalTerm}
        setOpen= {setModalTerm}
        loading={loading || isLoading}
        disable={!businessName || !selectedCountry.code}
        onClickBtnConfirm= {(): void =>{
          handleBecomeSeller({
            business_name: businessName,
            country: selectedCountry
          })
        }}
      >
        <CustomInput placeholder='Ex: Nuvann Store' label={t('business_name')} type='text' value={businessName} onChange={(e: any) =>setBusinessName(e)} />
        <CustomSelect options={countries.length && formatCountriesArray(countries) as any} onSelect={(e)=> setSelectedCountry(e)} title={t('country')} />
      </ModalActions>
    </div>
  );
};

export default SellerOnboardingHero;
