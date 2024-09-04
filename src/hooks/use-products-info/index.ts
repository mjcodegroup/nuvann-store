import { useProducts } from "@/contexts/products";
import { nuvannApi } from "@/services/api";

export function useProductsInfo() {
    const { state: productsState, dispatch: productsDispatch } = useProducts();

    async function getProducts() {
        const response = await nuvannApi.get('/products')
        productsDispatch({ type: 'SET_PRODUCTS', value: response.data });
    }

    async function getProductDetails(id: string) {
        const response = await nuvannApi.get(`/products/${id}`)
        productsDispatch({ type: 'SET_PRODUCT_DETAILS', value: response.data });
    }

    return {
        getProducts,
        getProductDetails
    }
}