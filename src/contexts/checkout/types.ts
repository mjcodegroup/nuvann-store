import { cartProduct, Shipment } from "../cart/types";
import { Price } from "../products/types";

export interface State {
    checkout: Checkout;
    loading: boolean;
}

export type Action =
    | {
        type: 'SET_CHECKOUT';
        value: Checkout;
    }
    | {
        type: 'SET_LOADING';
        value: boolean;
    }; 

export interface CheckoutContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

export interface Checkout {
    currency: string;
    total: number;
    count: number;
    items: Item[];
    sub_total: number;
    shipping_cost: number;
}

export interface Item {
    id: number;
    price: number;
    quantity: number;
    product: cartProduct
    sub_total: Price;
    available_shipments: Shipment[];
    shipping_amount: number;
    total_price: number;
    tax_amount: number;
    discount_amount: number;
    price_with_applied_discount: number;
}