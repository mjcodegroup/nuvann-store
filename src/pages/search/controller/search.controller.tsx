import React from 'react'
import Search from '../view/search.view'
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';

export default function SearchController() {
    const router = useRouter();
    const { search } = router.query;

    React.useEffect(() => {
        const options = {
          search,
        }
      }, [search])
  return (
    <HomePageDefault>
        <Search />
    </HomePageDefault>
  )
}
