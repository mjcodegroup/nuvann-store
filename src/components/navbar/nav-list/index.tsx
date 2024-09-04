import Link from 'next/link'
import React from 'react'
import Styles from "./nav-list.module.scss"
import { useTranslation } from 'react-i18next';
import DropdownSimple from '@/components/dropdown-simple';
import { Category } from '@/contexts/categories/types';
import { NavListProps } from '../types';


export default function NavList(props: NavListProps) {  
  const { t } = useTranslation();
  return (
    <nav className={Styles.navbar_list}>
        <ul>
            <Link href="/">{t("navContent.home")}</Link>
            <DropdownSimple
              onCategorySelect={(category: Category) => props.onCategorySelect(category)}
              categories={props.categories}
              contentWidth={props.width}
            >
            <Link href="/#">
              {t("navContent.category")}
            </Link>
            </DropdownSimple>
            <Link href="/promotions">
              {t("navContent.promotion")}
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
        </ul>
    </nav>
  )
}
