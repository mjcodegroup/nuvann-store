import React from 'react'
import Styles from './container-infos.module.scss';
import PaggingSlides from '@/components/pagging-slider';
import Details from '../details';
import { ContainerInfosProps } from '../../types';

export default function ContainerInfos(props: ContainerInfosProps) {
  return (
    <div className={Styles.pagging_section}>
      <PaggingSlides images={props.product?.images} />
      <div>
        <Details
          addToCartLoader={props.addToCartLoader}
          onError={props.onError}
          qty={props.qty}
          onSelectedColor={props.onSelectedColor}
          onSelectedSize={props.onSelectedSize}
          selectedColor={props.selectedColor}
          selectedSize={props.selectedSize}
          selectedShippingInfo={props.selectedShippingInfo}
          onChangeQuantity={props.onChangeQuantity}
          onIncrement={props.onIncrement}
          onDecrement={props.onDecrement}
          onAddToCart={props.onAddToCart}
          onPurchase={props.onPurchase}
          onSelectedShippingInfo={props.onSelectedShippingInfo} 
          productInfos={props.product}
          onPurchaseLoading={props.onPurchaseLoading}
        />
      </div>
    </div>
  )
}
