import Link from 'next/link'
import React from 'react'
import Styles from "./nav-list.module.scss"
import Cookie from '@/utils/cookie';
import { useTranslation } from 'react-i18next';

export default function NavList() {
  const { t } = useTranslation(Cookie.getCookie("NEXT_I18LANG"), { useSuspense: false });
  return (
    <nav className={Styles.navbar_list}>
        <ul>
            <Link href="/">{t("navContent.home")}</Link>
            <Link href="/promotions">
              {t("navContent.promotion")}
            </Link>
            <Link href="/category">
              {t("navContent.category")}
            </Link>
            <Link href="/sell">
              {t("navContent.sell")}
            </Link>
            <Link href="/category?category=man">
              {t("navContent.man")}
            </Link>
            <Link href="/category?category=women">
              {t("navContent.women")}
            </Link>
            {/* <Dropdown categories={productsCategories} contentWidth="100%">
                <Link to="#">Kategori</Link>
            </Dropdown> */}
        </ul>
    </nav>
  )
}
