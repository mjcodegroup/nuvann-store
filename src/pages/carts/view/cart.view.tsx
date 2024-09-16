import React from 'react';
import { useTranslation } from 'react-i18next';
import CartCard from '../components/cart-card';
import CartResume from '../components/resume';
import styles from './style.module.scss';
import { CartProps } from '../types';
import EmptyCart from '../components/empty-cart';


const Cart: React.FC<CartProps> = (props: CartProps) => {
  const { t } = useTranslation("cart");
  const { data, removeFromCart } = props;

  return (
    <div>
      {
      data.count < 1 ? (
       <EmptyCart/>
      ) : (
      <div className={styles.cartWrapper}>
        <div className={styles.cartCard}>
          <div className={styles.cardTitle}>
            <h3>{t("cart.shopping_cart")}</h3>
          </div>
          <CartCard 
            data={data}
            removeFromCart={removeFromCart}
            onDecrementButton={props.onIncrementButton}
            onIncrementButton={props.onDecrementButton}
          />
        </div>
        <div className={styles.cartResume}>
          <CartResume
            data={data}
            OnCheckout={props.onCheckout}
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default Cart;
