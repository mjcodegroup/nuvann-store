import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import styles from './style.module.scss';
import InputQuantity from '@/components/input-quantity';

interface CartCardProps {
  items: {
    id: string;
    price: number;
    quantity: number;
    product: {
      id: string;
      name: string;
      description: string;
      images: { id: string; url: string; alt: string }[];
      price: number;
      properties: { key: string; value: string; quantity: number }[];
    };
    shipment: {
      id: string;
      price: number;
      currency: string;
      delivery_deadline: string;
      coverage_area: string;
      default_shipment: boolean;
    };
    sub_total: {
      raw: number;
      formatted: string;
      discount: {
        percent: number;
        value: number;
      };
    };
  }[];
  removeFromCart: (id: string) => Promise<void>;
}

const CartCard: React.FC<CartCardProps> = ({ items, removeFromCart }) => {
  const [errorMessage, setErrorMessage] = useState('');
  function incrementButton(index: number): void { }
  function decrementButton(index: number): void { }

  return (
    <>
      <div className={styles.cardTitle}>
        <h3>Nuvann Panye</h3>
      </div>
      {items.map((item) => (
        <div key={item.id} className={styles.cart_card_container}>
          <div className={styles.cart_card_content}>
            <div className={styles.cart_card_content_img}>
              <Image
                src={item.product.images[0]?.url || '/path/to/default-image.jpg'}
                alt={item.product.name || 'Product Image'}
                width={150}
                height={150}
              />
            </div>
            <div className={styles.cart_card_content_desc}>
              <h3>
                {item.product.name.length > 12
                  ? item.product.name.substring(0, 12) + '...'
                  : item.product.name}
              </h3>
              <div className={styles.content_desc}>
                <p>Description:</p>
                <span>{item.product.description || 'No Description Available'}</span>
              </div>
              <div className={styles.content_desc}>
                <p>Price:</p>
                <span>{item.sub_total.formatted}</span>
              </div>
            </div>
            <div className={styles.content_icon_delete}>
              <MdDelete
                color='red'
                size={22}
                onClick={() => removeFromCart(item.id)}
              />
            </div>
          </div>
          <hr />
          <div className={styles.cart_card_footer}>
            <div className="cart_card_quantity">
              <InputQuantity
                value={item?.quantity}
                label="kantite"
                increment={() => incrementButton(item?.quantity)}
                decrement={() => decrementButton(item?.quantity)} />
            </div>
            <div className={styles.cart_card_total}>
              <p>
                {item.sub_total.formatted}
                {item.sub_total.raw !== item.price && (
                  <span> {item.price}</span>
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
