import { useOrderDetails } from '@/contexts/orders-details';
import { useToast } from '@/contexts/toast';
import { nuvannApi } from '@/services/api';
import { useEffect } from 'react';

export function useOrdersDetailsInfo(orderId: string) {
    const { errorToast } = useToast();
    const { state: ordersState, dispatch: orderDetailsDispatch } = useOrderDetails();

    async function getOrderDetails() {
        try {
            orderDetailsDispatch({ type: 'SET_ORDER_DETAILS_LOADER', value: true });
            const response = await nuvannApi.get(`/orders/purchases/items/${orderId}`);
            orderDetailsDispatch({ type: 'SET_ORDER_DETAILS', value: response.data });
        } catch (error: any) {
            errorToast(error.response?.data.message || 'Failed to fetch orders');
        } finally {
            orderDetailsDispatch({ type: 'SET_ORDER_DETAILS_LOADER', value: false });
        }
    }

    useEffect(() => {
            getOrderDetails();
    }, []);
    return {
        ordersState,
        order: ordersState.order,
        getOrderDetails,
        isLoading: ordersState?.order_details_loader,
    };
}
