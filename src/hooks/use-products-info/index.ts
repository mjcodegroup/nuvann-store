import { useProducts } from "@/contexts/products";
import { nuvannApi } from "@/services/api";

export function useProductsInfo() {
    const { state: productsState, dispatch: productsDispatch } = useProducts();

    async function getProducts() {
        productsDispatch({ type: 'SET_LOADING', value: true });
        const response = await nuvannApi.get('/products')
        productsDispatch({ type: 'SET_PRODUCTS', value: response.data });
        productsDispatch({ type: 'SET_LOADING', value: false });
    }

    async function getProductDetails(id: string) {
        const response = await nuvannApi.get(`/products/${id}`)
        productsDispatch({ type: 'SET_PRODUCT_DETAILS', value: response.data });
    }

    return {
        loading: productsState.isLoading,
        getProducts,
        getProductDetails
    }
}