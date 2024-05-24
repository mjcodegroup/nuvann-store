import LanguageSelector from '@/components/language-selector';
import { Avatar, Badge } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import { FiUser } from 'react-icons/fi';
import Styles from "./nav-options.module.scss"
import Image from 'next/image';
import cartIcon from "../../../../public/assets/icons/cartIcon.svg"
import { NavOptionProps } from '../types';

export default function NavOptions(props: NavOptionProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
  return (
    <ul className={Styles.nav_options_container}>
        
    { !props.user ?
      <>
      <li onClick={handleClick}
        // onMouseOver={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}>
        <Avatar 
          alt={"user.name"}
          src={"navAvatar"}
          sx={{ width: 32, height: 32 }}
        />
        <span> Marc</span>
      </li>
      {/* <Menu
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
              left: 25,
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profil
        </MenuItem>
        <MenuItem onClick={()=> goTo("/orders")}>
          <ListItemIcon>
            <LocalOffer fontSize="small" />
          </ListItemIcon>
          Pwodui ou achte
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        {
          user.role === "ADMINISTRATOR" &&
            <MenuItem onClick={()=> goTo("/admin/dashboard")}>
                <ListItemIcon>
                    <AdminPanelSettings fontSize="small" />
                </ListItemIcon>
                Go to Admin
            </MenuItem>
        }
        <Divider />
        <MenuItem onClick={() =>logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu> */}
      </>
    :
    <li>
      <Link href="/login" >
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
