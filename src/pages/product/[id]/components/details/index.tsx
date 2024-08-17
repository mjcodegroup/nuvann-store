import React from 'react'
import Styles from './details.module.scss';


interface DetailsProps {
    productInfos: any;
}
export default function Details(props: DetailsProps) {
    const {productInfos} = props;

  return (
    <div className={Styles.product_infos}>
        <div>
            <h3>{productInfos?.name}</h3>
            <div className={Styles.title_footer}>
                <p><span>Vandè:</span> <small>{productInfos?.seller?.name}</small>  </p>
                <p><span>Pays:</span> <small>{productInfos?.seller?.country?.name}</small></p>
                <p>Vant: <small>{productInfos?.soldAmount} unite</small></p>
            </div>

            <div className={Styles.prices_class}>
                <p>
                <small>{productInfos?.prices?.before?.formatted}</small>
                {productInfos?.prices?.current?.formatted}
                {
                    productInfos?.prices?.current?.discountPercent && 
                    <span>-{productInfos?.prices?.current?.discountPercent} %</span>
                }
                </p>
            </div>

        </div>
    </div>
  )
}
