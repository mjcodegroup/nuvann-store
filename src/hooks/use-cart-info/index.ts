import { useCart } from "@/contexts/cart";
import { nuvannApi } from "@/services/api";

export function useCartInfo() {
  const { state: cartState, dispatch: cartDispatch } = useCart();

  async function getCart() {
    const response = await nuvannApi.get('/carts/items');
    cartDispatch({ type: 'SET_CART', value: response.data });
    return response.data;
  }

  const removeFromCart = async (id: string) => {
    try {
      await nuvannApi.delete(`/carts/items/${id}`);
      cartDispatch({ type: 'REMOVE_FROM_CART', value: id });
    } catch (error: any) {
      console.error('Error removing item:', error.response?.data.message);
    }
  };

  const updateCart = async (id: string) => {
    try {
      await nuvannApi.delete(`/carts/items/${id}`);
      cartDispatch({ type: 'REMOVE_FROM_CART', value: id });
    } catch (error: any) {
      console.error('Error removing item:', error.response?.data.message);
    }
  };

  return {
    getCart,
    removeFromCart,
    updateCart
  };
}
