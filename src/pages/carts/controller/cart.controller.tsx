import React, { useEffect, useState } from 'react';
import { HomePageDefault } from '@/components/home-page-default';
import Cart from '../view/cart.view';
import { useCartInfo } from '@/hooks/use-cart-info';

export default function CartController() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState({
    currency: '',
    total: 0,
    count: 0,
    items: [],
  });
  const { getCart, removeFromCart } = useCartInfo();

  useEffect(() => {
    async function fetchCart() {
      try {
        const cartResponse = await getCart();
        setCartData(cartResponse);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCart();
  }, [getCart]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <HomePageDefault>
      <Cart data={cartData} removeFromCart={removeFromCart} />
    </HomePageDefault>
  );
}
