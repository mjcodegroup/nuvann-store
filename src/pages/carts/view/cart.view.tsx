import React from 'react';
import { useTranslation } from 'react-i18next';
import { CartProps } from '../types';
import CartCard from '../components/cart-card';
import CartResume from '../components/resume';
import styles from './style.module.scss';

const Cart: React.FC<CartProps> = (props) => {
  const { t } = useTranslation();

  const OnclickContinue = () => {
    // Define the action for the "Continue" button
  };

  return (
    <div>
      <div className={styles.cartWrapper}>
        <div className={styles.cartCard}>
          <CartCard items={props.data} />
        </div>
        <div className={styles.cartResume}>
          <CartResume count={2} cartTotal={17} shipTotal='564,26' productSubtotal='98564,64' OnclickContinue={OnclickContinue} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
