import React, { createContext, useMemo } from 'react';
import { OrderItem } from '../orders/types';
import { OrdersDetailsContextProps, State } from './types';
import { reducer } from './orders-details-reducer';

export const OrdersDetailsContext = createContext<OrdersDetailsContextProps>(
    {} as OrdersDetailsContextProps
);

const initialState: State = {
    order: {} as OrderItem,
    order_details_loader: false,
    update_order_loader: false,
};

export function OrdersDetailsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <OrdersDetailsContext.Provider value={value}>
            {children}
        </OrdersDetailsContext.Provider>
    );
}

export function useOrderDetails() {
    const context = React.useContext(OrdersDetailsContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrdersProvider');
    }
    return context;
}
