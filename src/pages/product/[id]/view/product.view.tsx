import React from 'react'
import { ProductProps } from '../types';
import Styles from './product.module.scss';
import ContainerInfos from '../components/container-infos';
import MoreDetails from '../components/more-details';

export default function Product(props: Readonly<ProductProps>) {
  if(props.fullLoading){
    return <h1>Loading</h1>
  }
  return (
    <section className={Styles.poduct_details_page_section}>
      <div className={Styles.__container}>
          <div className={Styles.__container_infos}>
              <ContainerInfos product={props.product}/>
          </div>
      </div>
      
      <MoreDetails
        description={props.product?.description}
        pro_country={props.product?.availableCountries}
        pro_seller={props.product?.seller?.country?.name}
        pro_category={props.product?.category?.name}
        // pro_subCategory={productInfos?.subcategory.name}
        // pro_tags={props.product?.category.tags}
      />

    </section>
  )
}
