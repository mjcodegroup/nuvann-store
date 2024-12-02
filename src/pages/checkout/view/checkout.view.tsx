import React from 'react'
import { CheckoutProps } from '../types';
import Styles from "./checkout.module.scss"
import OrderResume from '@/components/order-resume';
import CardAddress from '../components/card-address';
import CardProducts from '../components/card-products';
import CardUpdateShipment from '../components/modal-update-shipment';
import { hasNoAvailableShipments } from '@/utils/get-default-shipment';
import { formatMoney } from '@/utils/formatter/format-money.util';
import FreeShippingText from '@/components/free-shipping-text';
import { formatPrice } from '@/utils/formatter/format-price.util';
import EmptyCheckout from '../components/empty-checkout';
import CheckoutSkeleton from '../components/checkout-skeleton';

export default function Checkout(props: Readonly<CheckoutProps>) {
  return (
    <>
    {
      props.isLoading ? (
       <CheckoutSkeleton />
      ) : props.business_items?.length === 0 ? (
         <EmptyCheckout />
      ) : (
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
            <CardProducts
              business_items={props.business_items}
              onClickBtnChangeShipment={props.onChangeBtnChangeShipment}
              currency={props.orderResume.currency as string}
            />

             <CardUpdateShipment 
              openModalShipment={props.openModalShipment}
              setOpenModalShipment={props.setOpenModalShipment}
              disableModalShipmentButton={props.disableModalShipmentButton}
              onConfirmModalShipment={props.onConfirmModalShipment}
              updateShippingInfoLoading={props.updateShippingInfoLoading}
              item={props.currentShippingInfo}
              onhangeShippmentInfos={props.onhangeShippmentInfos}
            />
        </div>

        <div className={Styles.resume_container}>
          {
            (props.orderResume.total && !props.placeOrderLoading) && (
              <OrderResume
                disabled={!props.userInfos.address || hasNoAvailableShipments(props.business_items)}
                data={{
                  count: props.orderResume.count,
                  sub_total: formatMoney(Number(props.orderResume?.sub_total), String(props.orderResume?.currency)),
                  shipping_cost: <FreeShippingText text={formatPrice(Number(props.orderResume?.shipping_cost), String(props.orderResume?.currency))}/>,
                  total: formatMoney(Number(props.orderResume?.total), String(props.orderResume?.currency)),
                }}
                OnCheckout={props.onPlaceOrder}
                loading={props.placeOrderLoading}
              />
            )
          }
        </div>
        </div>
      )}
    </>
  );
}
