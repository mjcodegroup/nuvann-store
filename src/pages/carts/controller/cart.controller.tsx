import React, { useEffect } from 'react';
import { HomePageDefault } from '@/components/home-page-default';
import Cart from '../view/cart.view';
import { useCartInfo } from '@/hooks/use-cart-info';
import { useCart } from '@/contexts/cart';

export default function CartController() {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { getCart, removeFromCart, updateCart } = useCartInfo();

  async function getCartInformations() {
    try {
      await getCart();
    } catch (error) {
      console.log("algo deu errado");
    }
  }

  useEffect(() => {
    getCartInformations();
  }, []);

  const handleCheckout = () => {
    alert('Checkout');
  };

  async function handleIncrementButton(itemId: number, position: number): Promise<void> {
    const cart= cartState.cart.items
    let newCart = [...cart]
    try {
      cart[position].quantity++
      cartDispatch({ type: 'SET_CART', value: { ...cartState.cart, items: newCart } });

      await updateCart(itemId, cart[position].quantity);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  }

  async function handleDecrementButton(itemId: number, position: number): Promise<void> {
    const cart= cartState.cart.items
    let newCart = [...cart]
    if(cart[position].quantity >= 1) {
      try {
        cart[position].quantity--
        cartDispatch({ type: 'SET_CART', value: { ...cartState.cart, items: newCart } });
        await updateCart(itemId, cart[position].quantity);
      } catch (error) {
        console.error('Failed to update cart:', error);
      }
    }
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
