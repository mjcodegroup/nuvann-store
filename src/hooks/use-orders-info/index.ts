import { useOrder } from '@/contexts/orders';
import { nuvannApi } from '@/services/api';
import { useToast } from '@/contexts/toast';
import React from 'react';

export function useOrdersInfo() {
    const { errorToast } = useToast();
    const { state: ordersState, dispatch: ordersDispatch } = useOrder();

    async function getOrders() {
        try {
            ordersDispatch({ type: 'SET_ORDER_LOADER', value: true });
            const response = await nuvannApi.get('/orders/purchases');
            ordersDispatch({ type: 'SET_ORDERS', value: response.data });
        } catch (error: any) {
            errorToast(error.response?.data.message || 'Failed to fetch orders');
        } finally {
            ordersDispatch({ type: 'SET_ORDER_LOADER', value: false });
        }
    }

    React.useEffect(() => {
        getOrders();
    }, []);

    return {
        ordersState,
        orders: ordersState?.orders || [],
        getOrders,
        isLoading: ordersState?.order_loader,
    };
}
