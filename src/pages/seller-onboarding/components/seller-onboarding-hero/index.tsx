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

interface selectedCountry {
  label: string;
  value: string;
}

const SellerOnboardingHero: React.FC = () => {
  const { t } = useTranslation("home");
  const {countries, loading} = useCountriesInfo();

    const {
      handleBecomeSeller,
      modalTerm,
      setModalTerm,
      isLoading,
    } = useUserInfo();

    const [businessName, setBusinessName] = React.useState<string>("");
    const [selectedCountry, setSelectedCountry] = React.useState<selectedCountry[] | any>([]);

  return (
    <div>
      <div className={Styles.seller_onboarding_hero}>
          <section className={Styles.hero_content}>
              <h1>Apply to shop and start earning today</h1>
              <p>Sign up now and see why over 600,000 shoppers choose Instacart for flexible earnings.</p>
              <CustomButton
                width={200}
                backgroundColor='#000052'
                onClick={() => setModalTerm(true)}
              >
                Become a seller
              </CustomButton>
          </section>
          <section className={Styles.hero_image}>

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
