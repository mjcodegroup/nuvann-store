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
            <Link href="/">{t("nav_content.home")}</Link>
            <DropdownSimple
              onCategorySelect={(category: Category) => props.onCategorySelect(category)}
              categories={props.categories}
              contentWidth={props.width}
            >
            <Link href="/#">
              {t("nav_content.category")}
            </Link>
            </DropdownSimple>
            <Link href="/promotions">
              {t("nav_content.promotion")}
            </Link>
            <Link href="/sell">
              {t("nav_content.sell")}
            </Link>
              <Link href="/category?category=man">
                {t("nav_content.man")}
              </Link>
            <Link href="/category?category=women">
              {t("nav_content.women")}
            </Link>
        </ul>
    </nav>
  )
}
