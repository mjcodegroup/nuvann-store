import { useOrder } from '@/contexts/orders';
import { nuvannApi } from '@/services/api';
import { useToast } from '@/contexts/toast';
import React from 'react';

export function useOrdersInfo() {
    const { errorToast } = useToast();
    const { state: ordersState, dispatch: ordersDispatch } = useOrder();
    const [openModalReceipt, setOpenModalReceipt] = React.useState(false);

    async function getOrders(): Promise<void> {
        try {
            ordersDispatch({ type: 'SET_ORDER_LOADER', value: true });
            const response = await nuvannApi.get('/orders/purchases');
            ordersDispatch({ type: 'SET_ORDERS', value: response.data });
        } catch (error: any) {
            errorToast(error.response?.data?.message);
        } finally {
            ordersDispatch({ type: 'SET_ORDER_LOADER', value: false });
        }
    }

    async function confirmReceipt(orderId: string): Promise<void> {
        try {
            ordersDispatch({ type: 'SET_CONFIRM_RECEIPT_LOADER', value: true });
            await nuvannApi.put(`/orders/items/${orderId}/delivery/confirm`);
            getOrders();
            setOpenModalReceipt(false);
        } catch (error: any) {
            errorToast(error.response?.data?.message);
        } finally {
            ordersDispatch({ type: 'SET_CONFIRM_RECEIPT_LOADER', value: false });
        }
    }

    React.useEffect(() => {
        if(!ordersState.orders.length){
            getOrders();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        ordersState,
        orders: ordersState?.orders || [],
        getOrders,
        isLoading: ordersState?.order_loader,
        confirmReceipt,
        openModalReceipt, 
        setOpenModalReceipt
    };
}
