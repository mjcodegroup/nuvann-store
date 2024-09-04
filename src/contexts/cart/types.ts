export interface State {
    cart: Cart;
}


export type Action =
    | {
        type: 'SET_CART';
        value:Cart;
    }
    // | {
    //     type: 'ADD_TO_CART';
    //     value: any;
    // }
    // | {
    //     type: 'REMOVE_FROM_CART';
    //     value: any;
    // }
    // | {
    //     type: 'CLEAR_CART';
    // };


export interface CartContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

export interface Cart {
    currency: string;
    total: number;
    count: number;
    items: CartItem[];
}

export type CartItem = {
    id: number;
    price: number;
    quantity: number;
    product: any;
    shipment: any;
    sub_total: number;
}