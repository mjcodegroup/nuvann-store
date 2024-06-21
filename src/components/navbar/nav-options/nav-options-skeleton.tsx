import React from 'react';
import { Skeleton } from '@mui/material';
import Styles from "./nav-options.module.scss";

export default function NavOptionsSkeleton() {
  return (
    <ul className={Styles.nav_options_container}>
      <li>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width={100} height={32} />
      </li>
      <li>
        <Skeleton variant="rectangular" width={24} height={24} />
      </li>
      <li>
        <Skeleton variant="circular" width={24} height={24} />
      </li>
      <li>
        <Skeleton variant="rectangular" width={50} height={32} />
      </li>
    </ul>
  );
}