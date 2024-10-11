import React from 'react'
import Styles from './mobile-navbar.module.scss'
import { MobileNavbarProps } from '../types'
import { IoChevronDownSharp, IoMenu } from 'react-icons/io5'
import { Avatar, Badge } from '@mui/material'
import { IoMdCart } from 'react-icons/io'
import SearchBar from '../search-bar'
import Link from 'next/link'
import CustomDrawer from '@/components/custom-drawer'
import { RoutesUrls } from '@/utils/enums/routesUrl'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { truncateStringWithEllipsis } from '@/utils/truncate-string-with-ellipsis'
import LanguageSelector from '@/components/language-selector'
import DropdownSimple from '@/components/dropdown-simple'
import { Category } from '@/contexts/categories/types'
import CustomButton from '@/components/custom-button'


const MobileNavbar = (props: MobileNavbarProps)=> {
  const { t } = useTranslation('nav_content');
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <nav className={Styles.mobile_nav_container}>
        <div className={Styles.__header}>
          <IoMenu size={25} color='#000052' onClick={()=> setOpen(true)}/>
          <Link href="/">Nuvann</Link>
          <Badge color="error" badgeContent={props.cartCount}>
            <Link href={RoutesUrls.CARTS}>
              <IoMdCart color='#000052' size={25}/>
            </Link>
          </Badge>
        </div>
        <SearchBar placeholder={props.placeholder} onSearch={props.onSearch} /> 
      </nav>

      <CustomDrawer open={open} onClose={()=>setOpen(false)} anchor='left'>
        <div className={Styles.drawer_container}>
            <div className={Styles._header}>
              <div className={Styles._content}>
                {
                  !props.isAuthenticated ? 
                    <div className={Styles._user}>
                      <Avatar
                        src={props?.user?.picture}
                        sx={{ width: 40, height: 40 }}
                      />
                      <h4>{truncateStringWithEllipsis(props.user?.given_name || props.user?.name, 40)} </h4>
                    </div> 
                  :
                  <button onClick={props.onSignIn}><FiUser color='#000052'/> <span>{t('nav_content.sign_in')}</span> | {t('nav_content.sign_up')}</button>
                }
              </div>
              <div className={Styles._footer}>
                <LanguageSelector />
              </div>
            </div>

            <div className={Styles._nav_list}>
            <ul>
              <Link href="/">{t("nav_content.home")}</Link>
                <DropdownSimple
                  onCategorySelect={(category: Category) => props.onCategorySelect(category)}
                  categories={props.categories}
                  contentWidth={props.width}
                >
                  {t("nav_content.category")}
                </DropdownSimple>
                
                <Link href={`/search?in_promotion=${true}`}>
                  {t("nav_content.promotion")}
                </Link>
                <div onClick={props.onClickSellerMenu}>
                  {t("nav_content.sell")}
                </div>
            </ul>

                <div className={Styles._nav_list_footer}>
                  <CustomButton
                    onClick={props.onLogout}
                    variant='text'
                    fullWidth
                  >
                    <FiLogOut fontSize="small" />
                   {t('nav_content.logout')}
                  </CustomButton>
                </div>
            </div>
        </div>
      </CustomDrawer>
    </>
  )
}

export default MobileNavbar;
