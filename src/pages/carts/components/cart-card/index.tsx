import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import styles from './style.module.scss';
import InputQuantity from '@/components/input-quantity';
import { truncateStringWithEllipsis } from '@/utils/truncate-string-with-ellipsis';
import { Cart, CartItem } from '@/contexts/cart/types';

interface CartCardProps {
  data: CartItem[];
  removeFromCart: (id: number) => Promise<void>;
}



const CartCard: React.FC<CartCardProps> = ( props: CartCardProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  function incrementButton(index: number): void { }
  function decrementButton(index: number): void { }


  return (
    <>
      <div className={styles.cardTitle}>
        <h3>Nuvann Panye</h3>
      </div>
      {props.data.map((item: CartItem) => (
        <div key={item.id} className={styles.cart_card_container}>
          <div className={styles.cart_card_content}>
            <div className={styles.cart_card_content_img}>
              <Image
                src={item.product.images[0]?.url}
                alt={item.product.name}
                width={150}
                height={150}
              />
            </div>
            <div className={styles.cart_card_content_desc}>
              <h3>
             { truncateStringWithEllipsis(item.product.name, 40)}
              </h3>
              <div className={styles.content_desc}>
                <p>Description:</p>
                <span>{truncateStringWithEllipsis(item.product.description, 60) || 'No Description Available'}</span>
              </div>
              <div className={styles.content_desc}>
                <p>Price:</p>
                <span>{item.sub_total}</span>
              </div>
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
                label="kantite"
                increment={() => incrementButton(item?.quantity)}
                decrement={() => decrementButton(item?.quantity)} 
              />
            </div>
            {/* <div className={styles.cart_card_total}>
              <p>
                {item.sub_total}
                {item.sub_total !== item.price && (
                  <span> {item.price}</span>
                )}
              </p>
            </div> */}
          </div>
        </div>
      ))}
      </>
  );
};

export default CartCard;
