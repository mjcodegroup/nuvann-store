import LanguageSelector from '@/components/language-selector';
import { Avatar, Badge } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import { FiUser } from 'react-icons/fi';
import Styles from "./nav-options.module.scss"
import Image from 'next/image';
import cartIcon from "../../../../public/assets/icons/cartIcon.svg"
import { NavOptionProps } from '../types';

export default function NavOptions(props: Readonly<NavOptionProps>) {
  return (
    <ul className={Styles.nav_options_container}>
    { props.user ?
      <li>
        <Avatar
        alt='user profile picture'
          src={props.user.avatar}
          sx={{ width: 32, height: 32 }}
        />
        <span>{props.user.name}</span>
      </li>
    :
    <li>
      <Link href="/api/auth/login" >
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
