export interface Orders {
    id: string;
    status: string;
    date: string;
    totalAmount: number;
}

export interface State {
    orders: Orders[];
    cart_loader: boolean;
    update_cart_loader: boolean;
}

export type Action = 
    | { type: 'SET_ORDERS'; value: Orders[] };

export interface OrdersContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}
