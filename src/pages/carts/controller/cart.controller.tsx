import React from 'react'
import { HomePageDefault } from '@/components/home-page-default'
import Cart from '../view/cart.view'
import productListMock from '@/utils/mocks/home/product-list';


export default function CartController() {
  return (
    <HomePageDefault>
      <Cart data={productListMock} />
    </HomePageDefault>
  )
}
