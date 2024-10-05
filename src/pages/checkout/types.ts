import { OrderResumeData } from "@/components/order-resume";
import { CheckoutItem } from "@/contexts/checkout/types";
import { User } from "@/contexts/user/types";

export interface CheckoutProps {
    orderResume: OrderResumeData;
    userInfos: User;
    orderItems: CheckoutItem[];
    openModalAddress: boolean;
    setOpenModalAddress: React.Dispatch<React.SetStateAction<boolean>>;
    disableModalAddressButton: boolean;
    onConfirmModalAddress: any;
    shipmentAddress: any;
    shipmentformErrors: any;
    setValues: any;
    countryList: any;
    updateShippingInfoLoading: boolean;
    onPlaceOrder: ()=> Promise<void>;
    placeOrderLoading: boolean;
}

export interface CardAddressProps {
    user: User;
    openModalAddress: boolean;
    setOpenModalAddress: React.Dispatch<React.SetStateAction<boolean>>;
    disableModalAddressButton: boolean;
    onConfirmModalAddress: any;
    shipmentAddress: any;
    shipmentformErrors: any;
    setValues: any;
    countryList: any;
    updateShippingInfoLoading: boolean;
}

export interface CardProductsProps {
    items: CheckoutItem[];
}