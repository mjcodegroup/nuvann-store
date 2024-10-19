import { useSellerDetails } from '@/contexts/seller-details';
import { useToast } from '@/contexts/toast';
import { nuvannApi } from '@/services/api';
import { useEffect } from 'react';

export function useSellerDetailsInfo(orderId: string) {
    const { errorToast } = useToast();
    const { state: sellerState, dispatch: sellerDetailsDispatch } = useSellerDetails();

    async function getSellerProds() {
        sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS_LOADER', value: true });
        try {
            const response = await nuvannApi.get('/products', {
                params: {
                    in_promotion: true,
                    size: 20
                }
            });
            sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS', value: response.data });
        } catch (error) {
            errorToast('Failed to fetch seller details');
            // sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS', value: {} });
        } finally {
            sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS_LOADER', value: false });
        }
    }

    useEffect(() => {
        if (orderId) {
            getSellerProds();
        }
    }, [orderId]);

    return {
        products: sellerState?.products,
        isLoading: sellerState?.seller_products_loader,
    };
}
