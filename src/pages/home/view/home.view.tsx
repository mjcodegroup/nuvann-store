import React from 'react'
import { useTranslation } from 'react-i18next';
import Cookie from '@/utils/cookie';
import Hero from '../components/hero';
import { HomeProps } from '../types';
import Jumbotron from '../components/jumbotron';

export default function Home(props: Readonly<HomeProps>) {
  const { t } = useTranslation();
  return (
    <>
    <Hero images={props.heroImages} autoSlideInterval={5000}/>
    <Jumbotron data={props.jumbotronData}/>
      {t('home.welcome')}
    </>
  )
}
