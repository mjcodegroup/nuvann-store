import { useSellerDetails } from '@/contexts/seller-details';
import { useToast } from '@/contexts/toast';
import { nuvannApi, nuvannPublicApi } from '@/services/api';
import { useEffect, useCallback } from 'react';

export function useSellerDetailsInfo(sellerId: string) {
    const { errorToast } = useToast();
    const { state: sellerState, dispatch: sellerDetailsDispatch } = useSellerDetails();

    const getSellerProducts = useCallback(async () => {
        sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS_LOADER', value: true });
        try {
            const response = await nuvannPublicApi.get('/products', {
                params: {
                    seller_business_account_id: sellerId,
                    size: 20
                }
            });
            sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS', value: response.data });
        } catch (error) {
            errorToast('Failed to fetch seller details');
        } finally {
            sellerDetailsDispatch({ type: 'SET_SELLER_PRODUCTS_LOADER', value: false });
        }
    }, [errorToast, sellerDetailsDispatch, sellerId]);

    useEffect(() => {
        if (sellerId) {
            getSellerProducts();
        }
    }, [sellerId, getSellerProducts]);

    return {
        products: sellerState?.products,
        isLoading: sellerState?.seller_products_loader,
    };
}
