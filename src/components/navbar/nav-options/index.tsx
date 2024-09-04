import LanguageSelector from '@/components/language-selector';
import { Avatar, Badge } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { TbLogout } from 'react-icons/tb';
import cartIcon from "../../../../public/assets/icons/cartIcon.svg";
import { NavOptionProps } from '../types';
import NavOptionsSkeleton from './nav-options-skeleton';
import Styles from "./nav-options.module.scss";

export default function NavOptions(props: NavOptionProps) {

  if(props.isLoading) {
    return <NavOptionsSkeleton />
  }

  return (
    <ul className={Styles.nav_options_container}>
    { props.isAuthenticated ?
    <>
      <li>
        <Avatar
          src={props?.user?.picture}
          sx={{ width: 32, height: 32 }}
        />
        <span>{props.user?.name}</span>
      </li>

      <li onClick={props.onLogout}><TbLogout /></li>
    </>
    :
    <li>
      <Link href="#" onClick={props.onSignIn}>
        <button><FiUser/> konekte | Enskri</button>
      </Link>
    </li>
    }
    <li>
      <Link href="/carts">
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
