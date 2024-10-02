import React from 'react'
import Categories from '../view/categories.view'
import { HomePageDefault } from '@/components/home-page-default'
import { useRouter } from 'next/router';
import { NoSsr } from '@mui/material';

export default function CategoriesController() {
    const router = useRouter();
  const { name } = router.query;
  return (
    <HomePageDefault>
        <NoSsr/>
        <p>
        {name ? `Category: ${name}` : 'Loading...'}
        </p>
        {/* <Categories />   */}
    </HomePageDefault>
  )
}
