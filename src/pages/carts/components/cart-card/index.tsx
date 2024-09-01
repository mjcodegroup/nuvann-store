import React, { useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';

interface CartCardProps {
  items: {
    id: number;
    name: string;
    description: string;
    images: string[];
    prices: {
      before: {
        raw: number;
        formatted: string;
        discountPercent: number;
      };
      current: {
        raw: number;
        formatted: string;
        discountPercent: number;
      };
    };
  }[];
}

const CartCard: React.FC<CartCardProps> = ({ items }) => {
  const [errorMessage, setErrorMessage] = useState('');

  // function incrementButton(index: number): void {
  //   let newCart = [...items];
  //   let proQty = items[index].quantity + 1;
  //   const proAmount = items[index]?.product?.availableAmount || 0;

  //   if (proAmount < proQty) {
  //     setErrorMessage(`Maximum quantity: ${proAmount}`);
  //   } else {
  //     setErrorMessage('');
  //     items[index].quantity++;
  //     // Handle state updates as needed
  //   }
  // }

  // function decrementButton(index: number): void {
  //   let newCart = [...items];
  //   let proQty = items[index].quantity - 1;
  //   const proAmount = items[index]?.product?.availableAmount || 0;

  //   if (proAmount < proQty) {
  //     setErrorMessage(`Maximum quantity: ${proAmount}`);
  //   } else if (proQty >= 1) {
  //     setErrorMessage('');
  //     items[index].quantity--;
  //     // Handle state updates as needed
  //   }
  // }

  return (
    <>
      <div className={styles.cardTitle}>
          <h3>Nuvann Panye</h3>
      </div>
      {items.map((item, index) => (
        <div key={item.id} className={styles.cart_card_container}>
          <div className={styles.cart_card_content}>
            <div className={styles.cart_card_content_img}>
              <Image
                src={item.images[0] || '/path/to/default-image.jpg'} 
                alt={item.name || 'Product Image'} 
              />
            </div>
            <div className={styles.cart_card_content_desc}>
              <h3>
                {item.name.length > 12
                  ? item.name.substring(0, 12) + '...'
                  : item.name}
              </h3>
              <div className={styles.content_desc}>
                <p>Description:</p>
                <span>{item.description || 'No Description Available'}</span>
              </div>
              <div className={styles.content_desc}>
                <p>Price:</p>
                <span>{item.prices.current.formatted}</span>
              </div>
            </div>
            <div className={styles.content_icon_delete}>
              {/* <MdDelete color='red' size={22} onClick={() => removeFromCart(Number(item.id))} /> */}
            </div>
          </div>
          <hr />
          <div className={styles.cart_card_footer}>
            <div className={styles.cart_card_quantity}>Quantity</div>
            <div className={styles.cart_card_total}>
              <p>
                {item.prices.current.formatted}
                {item.prices.before.raw !== item.prices.current.raw && (
                  <span>{item.prices.before.formatted}</span>
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
