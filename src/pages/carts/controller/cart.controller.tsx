import React, { useEffect, useState } from 'react';
import { HomePageDefault } from '@/components/home-page-default';
import Cart from '../view/cart.view';
import { useCartInfo } from '@/hooks/use-cart-info';
import { useCart } from '@/contexts/cart';

export default function CartController() {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { getCart, removeFromCart } = useCartInfo();

  async function getCartInformations() {
    try {
      await getCart();
    } catch (error) {
      console.log("algo deu errado")
    }
  }

  useEffect(() => {
    getCartInformations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCheckout = () => {
    // Define the action for the "Continue" button
    alert('Checkout');
  };

  function handleIncrementButton(index: number): void {
    console.log('incrementButton', index);
  }
  function handleDecrementButton(index: number): void {
    console.log('decrementButton', index);
  }



  if (cartState.cart_loader) {
    return <div>Loading...</div>;
  }

  return (
    <HomePageDefault>
      <Cart
        onCheckout={handleCheckout}
        data={cartState.cart}
        removeFromCart={removeFromCart}
        onDecrementButton={handleDecrementButton}
        onIncrementButton={handleIncrementButton}
      />
    </HomePageDefault>
  );
}
