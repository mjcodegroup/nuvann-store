import { ImageMedia, Price } from "../products/types";

export interface State {
    cart: Cart;
    cart_loader: boolean;
    update_cart_loader: boolean;
}


export type Action =
    | {
        type: 'SET_CART';
        value:Cart;
    }
    | {
        type: 'REMOVE_FROM_CART';
        value: any;
    }
    | {
        type: 'SET_CART_LOADER';
        value: boolean;
    }
    | {
        type: 'UPDATE_CART';
        value: any;
    }


export interface CartContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

export interface Cart {
    currency: string;
    total: number;
    count: number;
    items: CartItem[];
    sub_total: number;
    shipping_cost: number;
}

export type CartItem = {
    id: number;
    price: number;
    quantity: number;
    product: cartProduct;
    shipment: Shipment
    sub_total: Price;
}

export type cartProduct = {
    id: number;
    name: string;
    description: string;
    images: ImageMedia[];
    price: number;
    properties: cartProperties[];
    available_amount: number;
}

export type cartProperties = {
    key: string;
    value: string;
    quantity: number;
}


export type Shipment = {
    id: string,
    price: number,
    currency: string,
    type: string,
    delivery_deadline: string,
    coverage_area: string,
    default_shipment: boolean,
    base_price: number,
}