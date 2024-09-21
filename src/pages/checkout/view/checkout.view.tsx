import React from 'react'
import { CheckoutProps } from '../types';
import Styles from "./checkout.module.scss"

export default function Checkout(props: Readonly<CheckoutProps>) {
  return (
    <div className={Styles.checkout_wrapper}>
        <div className={Styles.address_container}>
            <h1>hello checkout</h1>
        </div>

        <div className={Styles.resume_container}>
            <h1>Resumo</h1>
        </div>
    </div>
  )
}
