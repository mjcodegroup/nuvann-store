import { useProducts } from "@/contexts/products";
import { getProductsParams } from "@/contexts/products/types";
import { nuvannApi } from "@/services/api";

export function useProductsInfo() {
    const { state: productsState, dispatch: productsDispatch } = useProducts();

    async function getProducts(options?: getProductsParams) {
        productsDispatch({ type: 'SET_LOADING', value: true });
        const params: getProductsParams = {
            page: 1,
            category_id: options?.category_id || undefined,
            in_promotion: options?.in_promotion || undefined,
            search: options?.search || undefined,
            size: 20
        }
        try {
            const response = await nuvannApi.get('/products', {
                params
            })
            productsDispatch({ type: 'SET_PRODUCTS', value: response.data });
        } catch (error) {
            productsDispatch({ type: 'SET_PRODUCTS', value: [] as any });
            
        } finally {
            productsDispatch({ type: 'SET_LOADING', value: false });
        }
    }

    async function getNewProducts() {
        productsDispatch({ type: 'SET_LOADING', value: true });
        try {
            const response = await nuvannApi.get('/products', {
                params: {
                    new_product: true,
                    size: 20
                }
            })
            productsDispatch({ type: 'SET_NEW_PRODUCTS', value: response.data });
        } catch (error) {
            productsDispatch({ type: 'SET_NEW_PRODUCTS', value: [] as any });
        } finally {
            productsDispatch({ type: 'SET_LOADING', value: false });
        }
    }

    async function getPromotionProducts() {
        productsDispatch({ type: 'SET_LOADING', value: true });
        try {
            const response = await nuvannApi.get('/products', {
                params: {
                    in_promotion: true,
                    size: 20
                }
            })
            productsDispatch({ type: 'SET_PROMOTION_PRODUCTS', value: response.data });
        } catch (error) {
            productsDispatch({ type: 'SET_PROMOTION_PRODUCTS', value: [] as any });
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
        getProductDetails,
        getNewProducts,
        getPromotionProducts
    }
}