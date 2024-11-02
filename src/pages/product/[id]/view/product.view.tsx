import React from 'react'
import { ProductProps } from '../types';
import Styles from './product.module.scss';
import ContainerInfos from '../components/container-infos';
import MoreDetails from '../components/more-details';

export default function Product(props: Readonly<ProductProps>) {
  if(props.fullLoading){
    return <h1>Loading....................................</h1>
  }
  

  return (
    <section className={Styles.poduct_details_page_section}>
      <div className={Styles.__container}>
        <div className={Styles.__container_infos}>
          <ContainerInfos
            isLoading={props.isLoading}
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
            product={props.product}
            onSelectedShippingInfo={props.onSelectedShippingInfo}
            onPurchaseLoading={props.onPurchaseLoading}
          />
        </div>
      </div>
      <MoreDetails
        description={props.product?.description}
        pro_country={props.product?.availableCountries}
        pro_seller={props.product?.seller?.country?.name}
        pro_categories={props.product?.categories}
      />
    </section>
  )
}
