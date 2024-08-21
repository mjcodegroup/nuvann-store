import React, { useEffect } from 'react'
import { HomePageDefault } from '@/components/home-page-default'
import Product from '../view/product.view'
import { useParams } from 'next/navigation';
import productListMock from '@/utils/mocks/home/product-list';

export default function ProductController() {
  const params = useParams<{ id: string; }>()
  const product = React.useRef<any>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

const getProduct = async (id: string) => {
  setTimeout(() => {
    const response = productListMock.find((product) => product.id === id)
    product.current= response
    setIsLoading(false)
  }, 1500);
}

useEffect(() => {
  getProduct(params?.id)
}, [params?.id])


console.log(product.current)
  return (
    <HomePageDefault>
      <Product product={product.current} fullLoading={isLoading}/>
    </HomePageDefault>
  )
}
