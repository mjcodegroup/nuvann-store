import { useProducts } from "@/contexts/products";
import { getProductsParams } from "@/contexts/products/types";
import { nuvannApi } from "@/services/api";

export function useProductsInfo() {
    const { state: productsState, dispatch: productsDispatch } = useProducts();

    async function getProducts(options?: getProductsParams) {
        productsDispatch({ type: 'SET_LOADING', value: true });
        const params: getProductsParams = {
            page: 1,
            categoryId: options?.categoryId,
            in_promotion: options?.in_promotion,
            search: options?.search || undefined,
            size: 10
        }
        try {
            const response = await nuvannApi.get('/products', {
                params
            })
            productsDispatch({ type: 'SET_PRODUCTS', value: response.data });
        } catch (error) {
            
        } finally {
            productsDispatch({ type: 'SET_LOADING', value: false });
        }
    }

    async function getProductDetails(id: string) {
        const response = await nuvannApi.get(`/products/${id}`)
        productsDispatch({ type: 'SET_PRODUCT_DETAILS', value: response.data });
    }

    return {
        products: productsState.products,
        loading: productsState.isLoading,
        getProducts,
        getProductDetails
    }
}