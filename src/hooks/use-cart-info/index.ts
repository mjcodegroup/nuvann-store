import { useCart } from "@/contexts/cart";
import { nuvannApi } from "@/services/api";
import { useNavigation } from "../useNavigation";
import { RoutesUrls } from "@/utils/enums/routesUrl";

export function useCartInfo() {
  const {redirect} = useNavigation();

    const { state: cartState, dispatch: cartDispatch } = useCart();

    async function getCart() {
        const response = await nuvannApi.get('/carts/items')
        cartDispatch({ type: 'SET_CART', value: response.data });
    }

    async function addProductToCart(data: CreateProductData) {
        // console.log(data);
        try {
            await nuvannApi.post('/carts/items', data);
            getCart();
            redirect(RoutesUrls.CARTS);
        } catch (error: any) {
            alert(error.response.data.message);
        }
    }

    return {
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