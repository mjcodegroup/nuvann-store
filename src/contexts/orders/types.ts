export interface Orders {
    id: string;
    status: string;
    date: string;
    totalAmount: number;
}

export interface State {
    orders: Orders[];
    order_loader: boolean;
    update_order_loader: boolean;
}

export type Action = 
    | { type: 'SET_ORDERS'; value: Orders[] }
    | { type: 'SET_ORDER_LOADER'; value: boolean };

export interface OrdersContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}
