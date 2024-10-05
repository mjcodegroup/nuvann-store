import { useOrderDetails } from '@/contexts/orders-details';
import { useToast } from '@/contexts/toast';
import React from 'react';

export function useOrdersDetailsInfo() {
    const { errorToast } = useToast();
    const { state: ordersState, dispatch: ordersDispatch } = useOrderDetails();

    React.useEffect(() => {
        if(!ordersState.order){
        }
    }, []);

    return {
        ordersState,
        order: ordersState?.order,
        isLoading: ordersState?.order_details_loader,
    };
}
