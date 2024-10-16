import React from 'react'
import Styles from './product-list.module.scss';
import Image from 'next/image';
import { Product } from '@/contexts/products/types';
import { ProductListProps } from '../../types';
import { truncateStringWithEllipsis } from '@/utils/truncate-string-with-ellipsis';
import { useTranslation } from 'react-i18next';

export default function ProductList(props: ProductListProps) {
    const { t } = useTranslation("home");

  return (
    <div className={Styles.product_list_container}>
    <div className={Styles._content}>
      {props.loading ?
          <>
        {/* <CustomSkeleton variant="rectangular" width="100%" height={40} animation="wave" /> */}
        {/* <CustomSkeleton variant="rectangular" width="100%" height={40} animation="wave" /> */}
        {/* <CustomSkeleton variant="rectangular" width="100%" height={40} animation="wave" /> */}
          </>
      :
      <>
        {props.products?.items?.map((prod:Product, index:number) => (
            <div className={Styles.card_product} key={prod.id} onClick={()=> props.onRedirectToProductDetails(prod.id)}>
                <div className={Styles.product_img}>
                    <Image src={prod?.images?.[0]?.url || ''} alt="" width={100} height={100}/>
                    <Image src={prod.images?.[1]?.url || ''} className={Styles.show_hover} alt="" width={100} height={100}/>
                </div>
                <div className={Styles.bottom}>
                    {prod.prices.current_price?.discount?.value ? (
                        <p className={Styles.daily_deal}>{t("today_deals")}</p>
                    ) : ''}
                    {
                    prod.prices.current_price?.discount?.value ? (
                    <p>
                        <i>de <span className={Styles.lastprice}> {prod.prices?.original_price?.formatted}</span></i>
                    </p>
                    ) : ''
                    }
                    <p className={Styles.current_price}>{prod.prices?.current_price?.formatted}
                    {prod.prices.current_price?.discount.value ? (
                        <span>{prod.prices.current_price?.discount?.value} %</span>
                    ) : ''}
                    </p>
                    <p className={Styles.description}>
                        {truncateStringWithEllipsis(prod.name, 60)}
                    </p>  
                </div>
            </div>
        ))}
      </>
      }
        </div>
      </div>
  )
}
