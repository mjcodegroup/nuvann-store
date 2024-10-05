import Link from 'next/link'
import React from 'react'
import Styles from "./nav-list.module.scss"
import { useTranslation } from 'react-i18next';
import DropdownSimple from '@/components/dropdown-simple';
import { Category } from '@/contexts/categories/types';
import { NavListProps } from '../types';


export default function NavList(props: NavListProps) {  
  const { t } = useTranslation('nav_content');
  
  return (
    <nav className={Styles.navbar_list}>
        <ul>
            <Link href="/">{t("home")}</Link>
            <DropdownSimple
              onCategorySelect={(category: Category) => props.onCategorySelect(category)}
              categories={props.categories}
              contentWidth={props.width}
            >
              {t("category")}
            </DropdownSimple>
            <Link href="/promotions">
              {t("promotion")}
            </Link>
              <div onClick={props.onClickSellerMenu}>
                {t("sell")}
              </div>
              <Link href="/category?category=man">
                {t("man")}
              </Link>
            <Link href="/category?category=women">
              {t("women")}
            </Link>
        </ul>
    </nav>
  )
}
