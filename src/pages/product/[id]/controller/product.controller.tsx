import React, { useEffect } from 'react'
import { HomePageDefault } from '@/components/home-page-default'
import Product from '../view/product.view'
import { useParams } from 'next/navigation';
import { useProducts } from '@/contexts/products';
import { useProductsInfo } from '@/hooks/use-products-info';

export default function ProductController() {
  const params = useParams<{ id: string; }>()
  const { state: productDetails, dispatch: productDetailsDispatch } = useProducts();
  const { getProductDetails } = useProductsInfo();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function getDetailsInformations(id: string) {
    try {
      await getProductDetails(id);
    } catch (error) {
      console.log("algo deu errado")
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    if (params?.id) getDetailsInformations(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id])


  return (
    <HomePageDefault>
      <Product product={productDetails.product} fullLoading={isLoading} />
    </HomePageDefault>
  )
}
