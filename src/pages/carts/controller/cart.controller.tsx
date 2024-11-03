import React, { useEffect } from 'react';
import { HomePageDefault } from '@/components/home-page-default';
import Cart from '../view/cart.view';
import { useCartInfo } from '@/hooks/use-cart-info';
import { useCart } from '@/contexts/cart';
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useAuth0 } from '@auth0/auth0-react';
import { Backdrop } from '@mui/material';

export default function CartController() {
  const { isAuthenticated } = useAuth0();

  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { removeFromCart, updateCart, isLoading } = useCartInfo({ isAuthenticated });

  const { redirect } = useNavigation();

  const handleCheckout = React.useCallback(() => {
    redirect(RoutesUrls.CHECKOUT)
  }, [redirect])

  const debouncedUpdateCart = async (itemId: number, quantity: number) => {
    await updateCart(itemId, quantity);
  }

  const  handleIncrementButton = (itemId: number, position: number): void => {
    const cart = cartState.cart.items;
    let newCart = [...cart];
    let itemToUpdate = { ...newCart[position] };
    
    itemToUpdate.quantity++;
    newCart[position] = itemToUpdate;
    cartDispatch({ type: 'SET_CART', value: { ...cartState.cart, items: newCart } });
    debouncedUpdateCart(itemId, newCart[position].quantity);
  }

  function handleDecrementButton(itemId: number, position: number): void {
    const cart = cartState.cart.items;
    let newCart = [...cart];
    let itemToUpdate = { ...newCart[position] };
    if(newCart[position].quantity > 1) {
      itemToUpdate.quantity--;
      newCart[position] = itemToUpdate;
      cartDispatch({ type: 'SET_CART', value: { ...cartState.cart, items: newCart } });
      debouncedUpdateCart(itemId, newCart[position].quantity);
    }
  }
  return (
      isLoading ? (
        <Backdrop open={isLoading}>
          <div>Loading...</div>
        </Backdrop>
      ) :
      (
        <HomePageDefault>
          <Cart
          fullLoader={cartState.cart_loader}
            onCheckout={handleCheckout}
            data={cartState.cart}
            removeFromCart={removeFromCart}
            onDecrementButton={handleDecrementButton}
            onIncrementButton={handleIncrementButton}
            disableIncrementAndDecrementBtn={cartState.cart_loader}
          />
        </HomePageDefault>

      )
  );
}
