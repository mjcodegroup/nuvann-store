import React from 'react'
import { CheckoutProps } from '../types';
import Styles from "./checkout.module.scss"
import OrderResume from '@/components/order-resume';
import CardAddress from '../components/card-address';
import CardProducts from '../components/card-products';

export default function Checkout(props: Readonly<CheckoutProps>) {
  return (
    <div className={Styles.checkout_wrapper}>
        <div className={Styles.address_container}>
            <CardAddress
              user={props.userInfos}
              onAddAddress={props.onAddAddress}
              onChangeAddress={props.onChangeAddress}
            />
            <CardProducts/>
        </div>

        <div className={Styles.resume_container}>
            <OrderResume disabled={!props.userInfos.address} data={props.orderResume} OnCheckout={() => {}} loading={false}/>
        </div>
    </div>
  )
}
