import React from 'react';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import styles from './style.module.scss';
import InputQuantity from '@/components/input-quantity';
import { truncateStringWithEllipsis } from '@/utils/truncate-string-with-ellipsis';
import { CartItem } from '@/contexts/cart/types';
import { CartCardProps } from '../../types';
import { useTranslation } from 'react-i18next';


const CartCard: React.FC<CartCardProps> = ( props: CartCardProps) => {
  const { t } = useTranslation('cart');
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
                <p>{t('cart.description')}:</p>
                <span>{truncateStringWithEllipsis(item.product.description, 60) || 'No Description Available'}</span>
              </div>
              <div className={styles.content_desc}>
                <p>{t('cart.price')}:</p>
                <span>{item.sub_total.formatted}</span>
              </div>
              {
                item.product.properties?.map((property, index) => (
                  property?.key && property?.value && (
                    <div key={index} className={styles.content_desc}>
                      <p>{property.key === "size" ? t('cart.size') : t('cart.color')}:</p>
                      <span>{property.value}</span>
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
                value={item?.quantity}
                label={t('cart.quantity')}
                availableText={t('cart.available')}
                decrement={() => props.onDecrementButton(item.id, index)} 
                increment={() => props.onIncrementButton(item.id, index)}
              />
            </div>
            <div className={styles.cart_card_total}>
              <p>
                {item.sub_total?.formatted}
                {item.sub_total?.raw !== item.product?.price && (
                  <span> {item?.product?.price}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartCard;
