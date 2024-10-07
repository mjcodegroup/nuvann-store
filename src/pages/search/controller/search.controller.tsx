import React from 'react'
import Search from '../view/search.view'
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import { useProductsInfo } from '@/hooks/use-products-info';
import { getProductsParams } from '@/contexts/products/types';
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useCategoriesInfo } from '@/hooks/use-categories-info';
import { Category } from '@/contexts/categories/types';

export default function SearchController() {
    const router = useRouter();
    const { redirect } = useNavigation();
    const {getProducts, products, loading} = useProductsInfo();
    const {categoriesState} = useCategoriesInfo();
    const { search, category_id } = router.query;


    React.useEffect(() => {
        const options = {
          search,
          category_id
        } as getProductsParams;
        getProducts(options);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [search, category_id])

      const handleRedirectToProductDetails = React.useCallback( (id: string | number) => {
        redirect(`/product/${id}` as RoutesUrls)
      }, [redirect])

      const handleChangeCategory = React.useCallback( (category: Category) => {
       redirect(`/search?search=${search}&category_id=${category.id}` as RoutesUrls)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])


  return (
    <HomePageDefault>
        <Search 
          products={products}
          loading={loading}
          searchQuery={search as string}
          productCount={products?.items?.length || 0}
          onRedirectToProductDetails={handleRedirectToProductDetails}
          categories={categoriesState.categories}
          onSelectCategory={handleChangeCategory}
        />
    </HomePageDefault>
  )
}
