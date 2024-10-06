import React from 'react'
import Search from '../view/search.view'
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import { useProductsInfo } from '@/hooks/use-products-info';
import { getProductsParams } from '@/contexts/products/types';

export default function SearchController() {
    const router = useRouter();
    const {getProducts, products, loading} = useProductsInfo();
    const { search } = router.query;

    React.useEffect(() => {
        const options = {
          search
        } as getProductsParams;
        getProducts(options);
      }, [search])

      console.log(products)
  return (
    <HomePageDefault>
        <Search  products={products} loading={loading}/>
    </HomePageDefault>
  )
}
