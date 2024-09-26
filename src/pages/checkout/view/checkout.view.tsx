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
              updateShippingInfoLoading={props.updateShippingInfoLoading}
              countryList={props.countryList}
              user={props.userInfos}
              openModalAddress={props.openModalAddress}
              setOpenModalAddress={props.setOpenModalAddress}
              disableModalAddressButton={props.disableModalAddressButton}
              onConfirmModalAddress={props.onConfirmModalAddress}
              shipmentAddress={props.shipmentAddress}
              shipmentformErrors={props.shipmentformErrors}
              setValues={props.setValues}
            />
            <CardProducts items={props.orderItems}/>
        </div>

        <div className={Styles.resume_container}>
            <OrderResume
              disabled={!props.userInfos.address}
              data={props.orderResume}
              OnCheckout={() => {}} loading={false}
            />
        </div>
    </div>
  )
}
