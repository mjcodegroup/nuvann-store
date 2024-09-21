import { HomePageDefault } from '@/components/home-page-default'
import React from 'react'
import Checkout from '../view/checkout.view'
import { useCheckoutInfo } from '@/hooks/use-checkout-info';

export default function CheckoutController() {

  const { checkout } = useCheckoutInfo();

  console.log(checkout);

  return (
    <HomePageDefault>
        <Checkout 
          orderResume={{
            count: checkout.count,
            sub_total: checkout.sub_total,
            shipping_cost: checkout.shipping_cost,
            total: checkout.total
          }
        }/>
    </HomePageDefault>
  )
}
