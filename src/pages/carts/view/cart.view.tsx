import React from 'react';
import { useTranslation } from 'react-i18next';
import CartCard from '../components/cart-card';
import styles from './style.module.scss';
import { CartProps } from '../types';
import EmptyCart from '../components/empty-cart';
import CartCardSkeleton from '../components/cart-card-skeleton';
import OrderResume from '@/components/order-resume';
import { formatMoney } from '@/utils/formatter/format-money.util';


const Cart: React.FC<CartProps> = (props: CartProps) => {
  const { t } = useTranslation("cart");
  const { data, removeFromCart } = props;

  return (
    <div>
      {
      data.count === 0 && !props.fullLoader ? (
       <EmptyCart/>
      ) : (
      <div className={styles.cartWrapper}>
        <div className={styles.cartCard}>
          <div className={styles.cardTitle}>
            <h3>{t("shopping_cart")}</h3>
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
              sub_total: formatMoney( data.sub_total, data.currency),
              shipping_cost: formatMoney(data.shipping_cost, data.currency),
              total: formatMoney(data.total, data.currency),
            }}
            hideShippingCost
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
