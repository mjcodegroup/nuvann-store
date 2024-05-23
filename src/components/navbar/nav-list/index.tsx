import Link from 'next/link'
import React from 'react'
import Styles from "./nav-list.module.scss"
import { getCookie } from '@/utils/cookie';
import { useTranslation } from 'react-i18next';

export default function NavList() {
  const { t } = useTranslation(getCookie("NEXT_I18LANG"), { useSuspense: false });
  return (
    <nav className={Styles.navbar_list}>
        <ul>
            <Link href="/">{t("navContent.home")}</Link>
            <Link href="/promotion">
              {t("navContent.promotion")}
            </Link>
            {/* <Dropdown categories={productsCategories} contentWidth="100%">
                <Link to="#">Kategori</Link>
            </Dropdown> */}
            <li  >Vann</li>
        </ul>
    </nav>
  )
}
