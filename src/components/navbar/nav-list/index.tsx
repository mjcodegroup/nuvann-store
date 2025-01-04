import Link from 'next/link'
import React from 'react'
import Styles from "./nav-list.module.scss"
import { useTranslation } from 'react-i18next';
import DropdownSimple from '@/components/dropdown-simple';
import { Category } from '@/contexts/categories/types';
import { NavListProps } from '../types';
import { UserRoles } from '@/utils/enums/user.enum';


export default function NavList(props: NavListProps) {  
  const { t } = useTranslation('nav_content');

  const sellerRedirect = props.userInfos?.roles?.includes(UserRoles.SELLER)
  const adminRedirect = props.userInfos?.roles?.includes(UserRoles.ADMINISTRATOR)
  
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
            <Link href={`/search?in_promotion=${true}`}>
              {t("promotion")}
            </Link>
            {
              !props.isLoading &&
              <div onClick={props.onClickSellerMenu}>
                {props.isAuthenticated && sellerRedirect
                  ? t("seller_space")
                  : props.isAuthenticated && adminRedirect
                  ? t("admin_space")
                  : t("sell")
                }
              </div>
            }
        </ul>
    </nav>
  )
}
