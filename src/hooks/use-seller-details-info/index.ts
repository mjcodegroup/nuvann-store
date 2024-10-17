import { useSellerDetails } from '@/contexts/seller-details';
import { useToast } from '@/contexts/toast';
import { nuvannApi } from '@/services/api';
import { useEffect } from 'react';

export function useSellerDetailsInfo(orderId: string) {
    const { errorToast } = useToast();
    const { state: sellerState, dispatch: sellerDetailsDispatch } = useSellerDetails();

    async function getSeller() {
        
    }

    useEffect(() => {
            getSeller();
    }, []);
    return {
        sellerState,
        order: sellerState.seller,
        getSeller,
        isLoading: sellerState?.seller_details_loader,
    };
}
