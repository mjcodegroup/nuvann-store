import React, { createContext, useMemo } from 'react';
import { OrdersContextProps, State, Orders } from './types';
import { reducer } from './order-reducer';

export const OrdersContext = createContext<OrdersContextProps>(
    {} as OrdersContextProps
);

const initialState: State = {
    orders: [],
    cart_loader: false,
    update_cart_loader: false,
};

export function OrdersProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrder() {
    const context = React.useContext(OrdersContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrdersProvider');
    }
    return context;
}
