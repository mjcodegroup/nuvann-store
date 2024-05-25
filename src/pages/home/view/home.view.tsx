import React from 'react'
import { useTranslation } from 'react-i18next';
import Cookie from '@/utils/cookie';

export default function Home() {
  const { t } = useTranslation(Cookie.getCookie("NEXT_I18LANG"), { useSuspense: false });
  return (
    <>
      {t('home.welcome')}
    </>
  )
}
