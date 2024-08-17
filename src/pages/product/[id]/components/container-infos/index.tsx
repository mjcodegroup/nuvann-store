import React from 'react'
import Styles from './container-infos.module.scss';
import PaggingSlides from '@/components/pagging-slider';
import Product from '../../view/product.view';
import Details from '../details';

interface ContainerInfosProps {
  product: any;
}

export default function ContainerInfos(props: ContainerInfosProps) {
  return (
    <div className={Styles.pagging_section}>
      <PaggingSlides images={props.product?.images} />
      <div>
        <Details productInfos={props.product} />
      </div>
    </div>
  )
}
