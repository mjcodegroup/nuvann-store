import LanguageSelector from '@/components/language-selector';
import { Avatar, Badge } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import { FiUser } from 'react-icons/fi';
import Styles from "./nav-options.module.scss"
import Image from 'next/image';
import cartIcon from "../../../../public/assets/icons/cartIcon.svg"
import { NavOptionProps } from '../types';
import { TbLogout } from 'react-icons/tb';

export default function NavOptions(props: NavOptionProps) {
  if(props.isLoading) {
    return <h1>Loading...........................</h1>
  }
  return (
    <ul className={Styles.nav_options_container}>
    { props.isAuthenticated ?
    <>
      <li>
        <Avatar
          src={props.user.picture}
          sx={{ width: 32, height: 32 }}
        />
        <span>{props.user.name}</span>
      </li>

      <li onClick={()=>props.onLogout()}><TbLogout /></li>
    </>
    :
    <li>
      <Link href="#" onClick={()=>props.onSignIn()}>
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
