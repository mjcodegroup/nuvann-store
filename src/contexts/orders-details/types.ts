import { OrderItem } from "../orders/types";

export interface State {
    order: OrderItem;
    order_details_loader: boolean;
    update_order_loader: boolean;
}

export type Action = 
    | {
         type: 'SET_ORDER_DETAILS'; value: OrderItem;
    }
    | {
         type: 'SET_ORDER_DETAILS_LOADER'; value: boolean;
    };

export interface OrdersDetailsContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}
