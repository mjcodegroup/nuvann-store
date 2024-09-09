import { useCart } from "@/contexts/cart";
import { nuvannApi } from "@/services/api";
import { useNavigation } from "../useNavigation";
import { RoutesUrls } from "@/utils/enums/routesUrl";
import { useToast } from "@/contexts/toast";

export function useCartInfo() {
    const {successToast, errorToast} = useToast();
  const {redirect} = useNavigation();

    const { state: cartState, dispatch: cartDispatch } = useCart();

    async function getCart() {
        const response = await nuvannApi.get('/carts/items')
        cartDispatch({ type: 'SET_CART', value: response.data });
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
        isLoading: cartState.cart_loader,
        getCart,
        addProductToCart,
    }
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