import { useCart } from "@/contexts/cart";
import { nuvannApi } from "@/services/api";
import { useNavigation } from "../useNavigation";
import { RoutesUrls } from "@/utils/enums/routesUrl";
import { useToast } from "@/contexts/toast";
import React from "react";
import { useUserInfo } from "../use-user-info";
import { useAuth0 } from "@auth0/auth0-react";

export function useCartInfo() {
  const { successToast, errorToast } = useToast();
  const { redirect } = useNavigation();

  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { isAuthenticated } = useAuth0();

  async function getCart() {
    try {
      const response = await nuvannApi.get('/carts/items');
      cartDispatch({ type: 'SET_CART', value: response.data });
      return response.data;
    } catch (error: any) {
      console.error('Error getting cart:', error.response?.data.message);
    } finally {
      cartDispatch({ type: 'SET_CART_LOADER', value: false });
    }
  }

  async function removeFromCart(id: number) {
    cartDispatch({ type: 'SET_CART_LOADER', value: true });
    try {
      const response = await nuvannApi.delete(`/carts/items/${id}`);
      successToast(response.data.message || 'Product deleted to cart');
      await getCart();
    } catch (error: any) {
      console.error('Error removing item:', error.response?.data.message);
    }
    cartDispatch({ type: 'SET_CART_LOADER', value: false });
  };

  async function updateCart(itemId: number, newQuantity: number) {
    try {
      await nuvannApi.patch(`/carts/items/${itemId}?quantity=${newQuantity}`);
      await getCart();
    } catch (error: any) {
      console.error('Error updating item:', error.response?.data.message);
      cartDispatch({ type: 'SET_CART_LOADER', value: false });
    }
  }

  async function addProductToCart(data: CreateProductData) {
    cartDispatch({ type: 'SET_CART_LOADER_REQUEST', value: true });
    try {
      const response = await nuvannApi.post('/carts/items', data);
      successToast(response.data.message || 'Product added to cart');
      getCart();
      cartDispatch({ type: 'SET_CART_LOADER_REQUEST', value: false });
      redirect(RoutesUrls.CARTS);
    } catch (error: any) {
      errorToast(error.response.data.message);
      cartDispatch({ type: 'SET_CART_LOADER_REQUEST', value: false });
    }
  }

  React.useEffect(() => {
    if(isAuthenticated && !cartState.cart.count) {
      getCart();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return {
    cartState,
    getCart,
    removeFromCart,
    updateCart,
    addProductToCart,
    isLoading: cartState.cart_loader,
    isRequesting: cartState.cart_loader_request
  };
}

export interface CreateProductData {
  quantity: number;
  properties: [
    {
      key: string;
      value: string;
      quantity: number;
    }
  ],
  product_id: string;
  shipment_id?: string | undefined;
}
