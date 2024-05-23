import React from 'react'
import { useTranslation } from 'react-i18next';
import { getCookie } from '@/utils/cookie';

export default function Home() {
  const { t } = useTranslation(getCookie("NEXT_I18LANG"), { useSuspense: false });
  return (
    <>
      {t('home.welcome')}
    </>
  )
}
