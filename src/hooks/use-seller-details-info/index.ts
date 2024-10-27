import { useSellerDetails } from '@/contexts/seller-details';
import { useToast } from '@/contexts/toast';
import { nuvannApi } from '@/services/api';
import { useEffect, useCallback } from 'react';

export function useSellerDetailsInfo(sellerId: string) {
    const { errorToast } = useToast();
    const { state: sellerState, dispatch: sellerDetailsDispatch } = useSellerDetails();

    const getSellerProds = useCallback(async () => {
        sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS_LOADER', value: true });
        try {
            const response = await nuvannApi.get('/products', {
                params: {
                    sellerId: true,
                    size: 20
                }
            });
            sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS', value: response.data });
        } catch (error) {
            errorToast('Failed to fetch seller details');
        } finally {
            sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS_LOADER', value: false });
        }
    }, [errorToast, sellerDetailsDispatch]);

    useEffect(() => {
        if (sellerId) {
            getSellerProds();
        }
    }, [sellerId, getSellerProds]);

    return {
        products: sellerState?.products,
        isLoading: sellerState?.seller_products_loader,
    };
}
