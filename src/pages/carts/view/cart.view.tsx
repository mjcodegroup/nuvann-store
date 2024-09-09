import React from 'react';
import { useTranslation } from 'react-i18next';
import CartCard from '../components/cart-card';
import CartResume from '../components/resume';
import styles from './style.module.scss';

interface CartProps {
  data: {
    currency: string;
    total: number;
    count: number;
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
  };
  removeFromCart: (id: string) => Promise<void>;
}

const Cart: React.FC<CartProps> = ({ data, removeFromCart }) => {
  const { t } = useTranslation();

  const OnclickContinue = () => {
    // Define the action for the "Continue" button
  };

  return (
    <div>
      <div className={styles.cartWrapper}>
        <div className={styles.cartCard}>
          <CartCard items={data.items} removeFromCart={removeFromCart}/>
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
    </div>
  );
};

export default Cart;
