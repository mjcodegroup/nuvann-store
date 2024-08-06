import LanguageSelector from '@/components/language-selector';
import { useKeycloak } from '@/hooks/useKeycloak';
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

  const { authenticated, keycloak, isLoading, user, handleLogin } = useKeycloak();


  async function handleLogout() {
  }


  if(props.isLoading) {
    return <NavOptionsSkeleton />
  }
  return (
    <ul className={Styles.nav_options_container}>
    { authenticated ?
    <>
      <li>
        <Avatar
          src={props.user.picture}
          sx={{ width: 32, height: 32 }}
        />
        <span>{props.user.name}</span>
      </li>

      <li onClick={handleLogout}><TbLogout /></li>
    </>
    :
    <li>
      <Link href="#" onClick={handleLogin}>
        <button><FiUser/> konekte | Enskri</button>
      </Link>
    </li>
    }
    <li>
      <Link href="/carts">
        <Badge color="error" badgeContent={2}>
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
