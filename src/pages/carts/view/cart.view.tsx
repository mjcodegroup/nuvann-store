import React from 'react';
import { useTranslation } from 'react-i18next';
import { CartProps } from '../types';
import CartCard from '../components/cart-card'

const Cart: React.FC<CartProps> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <CartCard items={props.data} />
    </>
  );
};

export default Cart;
