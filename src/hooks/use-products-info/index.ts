import { useProducts } from "@/contexts/products";
import { getProductsParams, PostQuickPurchaseType, ProductDetailsParams } from "@/contexts/products/types";
import { nuvannApi } from "@/services/api";
import { useNavigation } from "../useNavigation";
import { RoutesUrls } from "@/utils/enums/routesUrl";
import { useToast } from "@/contexts/toast";

export function useProductsInfo() {
    const { state: productsState, dispatch: productsDispatch } = useProducts();
    const { redirect } = useNavigation();
  const { successToast, errorToast } = useToast();

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

    async function getProductDetails(params: ProductDetailsParams) {
        let queryParams = '';

        if (params.size) {
          queryParams += `&size=${params.size}`;
        }
        
        if (params.color) {
          queryParams += `&color=${params.color}`;
        }
        
        const queryString = queryParams ? '?' + queryParams.slice(1) : '';
        const response = await nuvannApi.get(`/products/${params.id}${queryString}`);
        productsDispatch({ type: 'SET_PRODUCT_DETAILS', value: response.data });
    }

    async function handleQuickPurchase(productId: string, data: PostQuickPurchaseType) {
        productsDispatch({ type: 'SET_QUICK_PURCHASE_LOADER', value: true });
        try {
            const response = await nuvannApi.post(`/products/${productId}/quick-purchase`, data)
            redirect(RoutesUrls.CHECKOUT + `?orderid=${response.data.order_id}` as RoutesUrls)
        } catch (error: any) {
            errorToast(error.response.data.message);
        } finally {
            productsDispatch({ type: 'SET_QUICK_PURCHASE_LOADER', value: false });
        }
    }

    return {
        products: productsState.products,
        loading: productsState.isLoading,
        getProducts,
        getProductDetails,
        getNewProducts,
        getPromotionProducts,
        handleQuickPurchase,
        quickPurchaseLoader: productsState.quickPurchaseLoader
    }
}