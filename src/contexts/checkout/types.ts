import { cartProduct, Shipment } from "../cart/types";
import { Country } from "../countries/types";
import { Price } from "../products/types";

export interface State {
    checkout: Checkout;
    loading: boolean;
    updateShippingInfosLoading: boolean;
    placeOrderLoading: boolean;
}

export type Action =
    | {
        type: 'SET_CHECKOUT';
        value: Checkout;
    }
    | {
        type: 'SET_LOADING';
        value: boolean;
    }
    | {
        type: 'SET_UPDATE_SHIPPINGINFOS_LOADING';
        value: boolean;
    }
    | {
        type: 'PLACE_ORDER_LOADING';
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
    sub_total: number;
    shipping_cost: number;
    business_items: BusinessItems[];
    order_id: string;
}

export interface BusinessItems {
    business:BusinessInfo;
    items: CheckoutItem[];
    subtotal: number;
    available_shipments: Shipment[];
}

export interface BusinessInfo {
    id: string;
    name: string;
}

export interface CheckoutItem {
    id: number;
    price: number;
    quantity: number;
    subtotal: Price;
    product: cartProduct
    public_id: string;
    is_available_for_selected_shipment: boolean;
    shipping_amount: number;
    total_price: number;
    tax_amount: number;
    unit_discount_amount: number;
    total_discount_amount: number;
    unit_price_with_discount: number;
}

export type ShippingInfoTypes = {

    shipping_address?: {
        street?: string,
        number?: string,
        complement?: string,
        neighborhood?: string,
        city?: string,
        zipCode?: string,
        country: Country,
        state_or_department: string;
      },
    shipping_contact?: {
        name?: string;
        phoneNumber?: string;
    },
    order_id?: string;
}


export type PlaceOrderTypes = {
    call_back_urls: {
        on_success: string,
        on_cancel: string
    },
}

export type ShipmentInfosTypes = {
    orderId: string;
    businessId: string;
    shipmentId: string;
}