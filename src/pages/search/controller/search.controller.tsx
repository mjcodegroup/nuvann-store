import React from 'react'
import Search from '../view/search.view'
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import { useProductsInfo } from '@/hooks/use-products-info';
import { getProductsParams } from '@/contexts/products/types';
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useCategoriesInfo } from '@/hooks/use-categories-info';

export default function SearchController() {
    const router = useRouter();
    const { redirect } = useNavigation();
    const {getProducts, products, loading} = useProductsInfo();
    const {categoriesState} = useCategoriesInfo();
    const { search, category_id, in_promotion } = router.query;
    const [defaultCheckedPromotion, setDefaultCheckedPromotion] = React.useState<boolean>(Boolean(in_promotion));
    const [categoryId, setCategoryID ] = React.useState<string>(category_id as string);


    React.useEffect(() => {
        const options = {
          search,
          category_id,
          in_promotion
        } as getProductsParams;
        getProducts(options);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [search, category_id, in_promotion])

      const handleRedirectToProductDetails = React.useCallback( (id: string | number) => {
        redirect(`/product/${id}` as RoutesUrls)
      }, [redirect])

      const handleChangeFilter = React.useCallback( (categoryId: string, inPromotion: boolean) => {
        setDefaultCheckedPromotion(inPromotion);
        setCategoryID(categoryId);
        redirect(`/search?search=${search || ''}&category_id=${categoryId}&in_promotion=${inPromotion}` as RoutesUrls)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [Boolean(in_promotion)])
      


  return (
    <HomePageDefault>
        <Search 
          products={products}
          loading={loading}
          searchQuery={search as string}
          productCount={products?.items?.length || 0}
          onRedirectToProductDetails={handleRedirectToProductDetails}
          categories={categoriesState.categories}
          onChangeFilter={handleChangeFilter}
          defaultCheckedPromotion={defaultCheckedPromotion}
        />
    </HomePageDefault>
  )
}
