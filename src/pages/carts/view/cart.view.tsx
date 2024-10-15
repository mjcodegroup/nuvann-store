import React from 'react';
import { useTranslation } from 'react-i18next';
import CartCard from '../components/cart-card';
import styles from './style.module.scss';
import { CartProps } from '../types';
import EmptyCart from '../components/empty-cart';
import CartCardSkeleton from '../components/cart-card-skeleton';
import OrderResume from '@/components/order-resume';


const Cart: React.FC<CartProps> = (props: CartProps) => {
  const { t } = useTranslation("cart");
  const { data, removeFromCart } = props;

  return (
    <div>
      {
      !data?.items?.length && !props.fullLoader ? (
       <EmptyCart/>
      ) : (
      <div className={styles.cartWrapper}>
        <div className={styles.cartCard}>
          <div className={styles.cardTitle}>
            <h3>{t("cart.shopping_cart")}</h3>
          </div>

          {
            props.fullLoader ? (
              <CartCardSkeleton />
            ) :
            (
              <CartCard
                disableIncrementAndDecrementBtn={props.disableIncrementAndDecrementBtn}
                data={data}
                removeFromCart={removeFromCart}
                onDecrementButton={props.onDecrementButton}
                onIncrementButton={props.onIncrementButton}
              />
            )
          }
        </div>
        <div className={styles.cartResume}>
          <OrderResume
            data={{
              count: data.count,
              sub_total: data.sub_total,
              shipping_cost: data.shipping_cost,
              total: data.total,
            }}
            OnCheckout={props.onCheckout}
            loading={props.disableIncrementAndDecrementBtn || props.fullLoader}
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default Cart;
