import { useOrder } from '@/contexts/orders';
import { nuvannApi } from '@/services/api';
import { useToast } from '@/contexts/toast';

export function useOrdersInfo() {
    const { errorToast } = useToast();
    const { state: ordersState, dispatch: ordersDispatch } = useOrder();

    async function getOrders() {
        try {
            const response = await nuvannApi.get('/orders/purchases');
            ordersDispatch({ type: 'SET_ORDERS', value: response.data });
            return response.data;
        } catch (error: any) {
            errorToast(error.response?.data.message || 'Failed to fetch orders');
            console.error('Failed to fetch orders', error);
        }
    }

    return {
        orders: ordersState?.orders || [],
        getOrders,
        isLoading: ordersState?.cart_loader,
    };
}
