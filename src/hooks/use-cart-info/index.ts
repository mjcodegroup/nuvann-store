import { useCart } from "@/contexts/cart";
import { nuvannApi } from "@/services/api";

export function useCartInfo() {
    const { state: cartState, dispatch: cartDispatch } = useCart();

    async function getCart() {
        const response = await nuvannApi.get('/carts/items')
        cartDispatch({ type: 'SET_CART', value: response.data });
    }

    return {
        getCart,
    }
}