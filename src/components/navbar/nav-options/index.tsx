/* eslint-disable jsx-a11y/role-supports-aria-props */
import LanguageSelector from '@/components/language-selector';
import { Avatar, Badge, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import cartIcon from "../../../../public/assets/icons/cartIcon.svg";
import { NavOptionProps } from '../types';
import NavOptionsSkeleton from './nav-options-skeleton';
import Styles from "./nav-options.module.scss";
import { truncateStringWithEllipsis } from '@/utils/truncate-string-with-ellipsis';
import React, { use } from 'react';
import { FaPerson } from 'react-icons/fa6';
import { FcShipped } from "react-icons/fc";
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useTranslation } from 'react-i18next';

export default function NavOptions(props: NavOptionProps) {
  const { t } = useTranslation('nav_content');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if(props.isLoading) {
    return <NavOptionsSkeleton />
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ul className={Styles.nav_options_container}>
    { props.isAuthenticated ?
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <>
      <li 
      onClick={handleOpenMenu}
      aria-controls={open ? 'account-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          src={props?.user?.picture}
          sx={{ width: 32, height: 32 }}
        />
        <span>{truncateStringWithEllipsis(props.user?.given_name || props.user?.name, 12)} <IoChevronDownSharp /></span>
      </li>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 30,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              >
                <div></div>
                <MenuItem
                 onClick={handleClose}>
                  <ListItemIcon>
                    <FaPerson fontSize="small" />
                  </ListItemIcon>
                  {t('nav_content.my_profile')}
                </MenuItem>
                <Link href={RoutesUrls.ORDERS}>
                  <MenuItem onClick={()=> null}>
                    <ListItemIcon>
                      <FcShipped fontSize="small" />
                    </ListItemIcon>
                    {t('nav_content.my_orders')}
                  </MenuItem>
                </Link>
                {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <FiSettings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                <Divider />
                <MenuItem onClick={props.onLogout}>
                  <ListItemIcon>
                    <FiLogOut fontSize="small" />
                  </ListItemIcon>
                  {t('nav_content.logout')}
                </MenuItem>
              </Menu>
    </>
    :
    <li>
      <Link href="#" onClick={props.onSignIn}>
        <button><FiUser color='#000052'/> <span>{t('nav_content.sign_in')}</span> | {t('nav_content.sign_up')}</button>
      </Link>
    </li>
    }
    <li>
      <Link href={RoutesUrls.CARTS}>
        <Badge color="error" badgeContent={props.cartCount}>
          <Image src={cartIcon} alt="cartIcon" />
        </Badge>
      </Link>
    </li>
    <li>
    <LanguageSelector/>
    </li>
  </ul>
  )
}
