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

  async function handleIncrementButton(itemId: number, currentQuantity: number): Promise<void> {
    const newQuantity = currentQuantity + 1;

    try {
      const updatedCartItems = cartState.cart.items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      // cartDispatch({ type: 'UPDATE_CART', value: { ...cartState.cart, items: updatedCartItems } });

      await updateCart(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  }

  async function handleDecrementButton(itemId: number, currentQuantity: number): Promise<void> {
    if (currentQuantity <= 1) return;
    const newQuantity = currentQuantity - 1;

    try {
      const updatedCartItems = cartState.cart.items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      // cartDispatch({ type: 'UPDATE_CART', value: { ...cartState.cart, items: updatedCartItems } });

      await updateCart(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update cart:', error);
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
