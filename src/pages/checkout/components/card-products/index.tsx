import React from 'react';
import Styles from "./card-products.module.scss"
import { useTranslation } from 'react-i18next';
import { CardProductsProps } from '../../types';
import Image from 'next/image';
import { CheckoutItem } from '@/contexts/checkout/types';

export default function CardProducts(props: CardProductsProps) {
  const { t } = useTranslation("checkout");

  return (
    <div className={Styles.products_wrapper}>
        <h4>{t("checkout.title_products_ordered")}</h4>
        <hr />
        {
          props.items?.map((item: CheckoutItem, index) => (
              <div className={Styles.products_row} key={item.id}>
                <div className={Styles.row}>
                  <div>
                    <Image src={item.product.images[0]?.url || ''} alt={item.product.images[0].alt|| ''} width={50} height={50} />
                    {item.product.name}
                  </div>
                  <div>
                    <p>Price</p>
                    <span>{item.product.price}</span>
                  </div>
                  <div>
                    <p>Amount</p>
                    <span>{item.quantity}</span>
                  </div>
                  <div>
                    <p>Item Subtotal</p>
                    <span>{item.sub_total.formatted}</span>
                  </div>
                </div>
                <div className={Styles._row_footer}>
                  <hr />
                  <div>
                    <p>Shipping</p>
                    <span>{item.shipping_amount}</span>
                  </div>
                  <div>
                    <p>Total Price</p>
                    <span>{item.total_price}</span>
                  </div>
                </div>
              </div>
          ))}
    </div>
  )
}
