import React from 'react';
import Styles from "./card-products.module.scss"
import { useTranslation } from 'react-i18next';
import { CardProductsProps } from '../../types';
import Image from 'next/image';
import { CheckoutItem } from '@/contexts/checkout/types';
import { truncateStringWithEllipsis } from '@/utils/truncate-string-with-ellipsis';
import CustomButton from '@/components/custom-button';
import { getDefaultShipment } from '@/utils/get-default-shipment';

export default function CardProducts(props: CardProductsProps) {
  const { t } = useTranslation("checkout");
  
  return (
    <div className={Styles.products_wrapper}>
        <h4>{t("checkout.title_products_ordered")}</h4> <br />
        {
          props.items?.map((item: CheckoutItem, index) => (
              <div className={Styles.products_row} key={item.id}>
                <div className={Styles.row}>
                  <div className={Styles._image}>
                    <Image src={item.product.images[0]?.url || ''} alt={item.product.images[0].alt|| ''} width={50} height={50} />
                    {truncateStringWithEllipsis(item.product.name, 15)}
                  </div>
                  <div className={Styles.row_content}>
                    <p>Price</p>
                    <span>{item.product.price}</span>
                  </div>
                  <div className={Styles.row_content}>
                    <p>Amount</p>
                    <span>{item.quantity}</span>
                  </div>
                  <div className={Styles.row_content}>
                    <p>Item Subtotal</p>
                    <span>{item.sub_total.formatted}</span>
                  </div>
                </div>
                  <div className={Styles.separator}></div>
                <div className={Styles._row_footer}>
                  <div>
                    <h5>{t('checkout.shipping_options')}:</h5>
                  </div>
                  <div>
                    <h5>{getDefaultShipment(item?.available_shipments)?.type}</h5>
                    <span>{getDefaultShipment(item?.available_shipments)?.delivery_deadline}</span>
                  </div>
                  <div>
                    <CustomButton variant='text' title='Change'>Change</CustomButton>
                  </div>
                  <div>
                    <h5>{item.shipping_amount}</h5>
                  </div>
                </div>
              </div>
          ))}
    </div>
  )
}
