import React from 'react'
import { useTranslation } from 'react-i18next';
import Cookie from '@/utils/cookie';
import Hero from '../components/hero';
import { HomeProps } from '../types';

export default function Home(props: Readonly<HomeProps>) {
  const { t } = useTranslation(Cookie.getCookie("NEXT_I18LANG"), { useSuspense: false });
  return (
    <>
    <Hero images={props.heroImages} autoSlideInterval={5000}/>
      {t('home.welcome')}
    </>
  )
}
