import { HomePageDefault } from '@/components/home-page-default'
import React from 'react'
import Checkout from '../view/checkout.view'
import { useCheckoutInfo } from '@/hooks/use-checkout-info';
import { useUserInfo } from '@/hooks/use-user-info';

export default function CheckoutController() {
  const { checkout } = useCheckoutInfo();
  const {user} = useUserInfo();

  return (
    <HomePageDefault>
        <Checkout 
          orderItems={checkout.items}
          userInfos={user}
          orderResume={{
            count: checkout.count,
            sub_total: checkout.sub_total,
            shipping_cost: checkout.shipping_cost,
            total: checkout.total
          }}
          onAddAddress={() => {}}
          onChangeAddress={() => {}}
        />
    </HomePageDefault>
  )
}
