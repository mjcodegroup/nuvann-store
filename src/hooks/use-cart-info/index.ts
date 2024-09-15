import { useCart } from "@/contexts/cart";
import { nuvannApi } from "@/services/api";
import { useNavigation } from "../useNavigation";
import { RoutesUrls } from "@/utils/enums/routesUrl";
import { useToast } from "@/contexts/toast";

export function useCartInfo() {
  const { successToast, errorToast } = useToast();
  const { redirect } = useNavigation();

  const { state: cartState, dispatch: cartDispatch } = useCart();

  async function getCart() {
    const response = await nuvannApi.get('/carts/items');
    cartDispatch({ type: 'SET_CART', value: response.data });
    return response.data;
  }

  async function removeFromCart(id: number) {
    try {
      await nuvannApi.delete(`/carts/items/${id}`);
      cartDispatch({ type: 'REMOVE_FROM_CART', value: id });
    } catch (error: any) {
      console.error('Error removing item:', error.response?.data.message);
    }
  };

  async function updateCart(itemId: number, newQuantity: number) {
    try {
      const response = await nuvannApi.patch(`/carts/items/${itemId}?quantity=${newQuantity}`);
      
      cartDispatch({ type: 'UPDATE_CART', value: response.data });
    } catch (error: any) {
      console.error('Error updating item:', error.response?.data.message);
    }
  }
  

  async function addProductToCart(data: CreateProductData) {
    cartDispatch({ type: 'SET_CART_LOADER', value: true });
    try {
      const response = await nuvannApi.post('/carts/items', data);
      successToast(response.data.message || 'Product added to cart');
      getCart();
      redirect(RoutesUrls.CARTS);
    } catch (error: any) {
      errorToast(error.response.data.message);

    } finally {
      cartDispatch({ type: 'SET_CART_LOADER', value: false });
    }
  }

  return {
    getCart,
    removeFromCart,
    updateCart,
    addProductToCart,
    isLoading: cartState.cart_loader,
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
  shipment_id: string | undefined;
}
