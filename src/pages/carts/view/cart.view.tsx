import React from 'react';
import { useTranslation } from 'react-i18next';
import CartCard from '../components/cart-card';
import CartResume from '../components/resume';
import styles from './style.module.scss';
import { CartProps } from '../types';
import EmptyCart from '../components/empty-cart';


const Cart: React.FC<CartProps> = (props: CartProps) => {
  const { t } = useTranslation();
  const { data, removeFromCart } = props;

  const OnclickContinue = () => {
    // Define the action for the "Continue" button
  };

  return (
    <div>
      {
      data.count < 1 ? (
       <EmptyCart/>
      ) :
       (

      <div className={styles.cartWrapper}>
        <div className={styles.cartCard}>
          <CartCard data={data.items} removeFromCart={removeFromCart}/>
        </div>
        <div className={styles.cartResume}>
          <CartResume
            count={data.count}
            cartTotal={data.total}
            shipTotal={data.count}
            productSubtotal={data.total}
            OnclickContinue={OnclickContinue}
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default Cart;
