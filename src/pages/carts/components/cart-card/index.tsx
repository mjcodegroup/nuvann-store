import React from 'react';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import styles from './style.module.scss';
import InputQuantity from '@/components/input-quantity';
import { truncateStringWithEllipsis } from '@/utils/truncate-string-with-ellipsis';
import { CartItem } from '@/contexts/cart/types';
import { CartCardProps } from '../../types';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import { formatMoney } from '@/utils/formatter/format-money.util';


const CartCard: React.FC<CartCardProps> = ( props: CartCardProps) => {
  const { t } = useTranslation( ['cart'] );
  const { t: tr } = useTranslation( ['common'] );
  return (
    <>
      {props.data?.items?.map((item: CartItem, index) => (
        <div key={item.id} className={styles.cart_card_container}>
          <div className={styles.cart_card_content}>
            <div className={styles.cart_card_content_img}>
              <Image
                src={item?.product.images?.[0]?.url as string}
                alt={item.product.name}
                width={150}
                height={150}
                layout="fixed"
              />
            </div>
            <div className={styles.cart_card_content_desc}>
              <h3>
             { truncateStringWithEllipsis(item.product.name, 40)}
              </h3>
              <div className={styles.content_desc}>
                <p>{t('description')}:</p>
                <span>{truncateStringWithEllipsis(item.product.description, 40)}</span>
              </div>
              <div className={styles.content_desc}>
                <p>{t('price')}:</p>
                  <span>{item.sub_total?.raw !== item.product?.price && (<small className={styles.line_through}>{formatMoney(item.price, item.currency)} </small>)}
                      <small className={styles.revert_line_through}>{formatMoney(item?.unit_price_with_discount, item.currency)}</small>
                </span>
              </div>
              {
                item.product.properties?.map((property, index) => (
                  property?.key && property?.value && (
                    <div key={index} className={styles.content_desc}>
                      <p>{property.key === "size" ? t('size') : t('color')}:</p>
                      <span>{property.key === "color" ? tr(`${property.value}`) : property.value}</span>
                    </div>
                  )
                ))
              }
            </div>
            <div className={styles.content_icon_delete}>
              <MdDelete
                color='red'
                size={22}
                onClick={() => props.removeFromCart(item.id)}
              />
            </div>
          </div>
          <hr />
          <div className={styles.cart_card_footer}>
            <div className={styles.cart_card_quantity}>
              <InputQuantity
                disabled={props.disableIncrementAndDecrementBtn}
                value={item?.quantity}
                label={t('quantity')}
                total={item.product.available_amount}
                availableText={t('available_s')}
                decrement={() => props.onDecrementButton(item.id, index)} 
                increment={() => props.onIncrementButton(item.id, index)}
              />
            </div>
            <div className={styles.cart_card_total}>
              {
                props.disableIncrementAndDecrementBtn ? (
                  <p><Skeleton typeof='..........' width={100} height={30}/> </p>
                ) :
                (
                  <p>
                    {formatMoney(item.sub_total?.raw, item.currency)}
                  </p>
                )
              }
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartCard;
