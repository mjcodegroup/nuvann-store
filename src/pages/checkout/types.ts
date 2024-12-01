import { OrderResumeData } from "@/components/order-resume";
import { BusinessItems, CheckoutItem } from "@/contexts/checkout/types";
import { User } from "@/contexts/user/types";

export interface CheckoutProps {
    orderResume: OrderResumeData;
    userInfos: User;
    business_items: BusinessItems[];
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
    onChangeBtnChangeShipment: (item:any)=> void;
    openModalShipment: boolean;
    setOpenModalShipment: React.Dispatch<React.SetStateAction<boolean>>;
    disableModalShipmentButton: boolean;
    onConfirmModalShipment: any;
    selectedShippingInfo: any;
    onhangeShippmentInfos: (item:any)=> void;
    currentShippingInfo: any;
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
    business_items: BusinessItems[];
    onClickBtnChangeShipment: (item:any)=> void;
    currency: string;      
}

export interface CardUpdateShipmentProps {
    openModalShipment: boolean;
    setOpenModalShipment: React.Dispatch<React.SetStateAction<boolean>>;
    disableModalShipmentButton: boolean;
    onConfirmModalShipment: any;
    updateShippingInfoLoading: boolean;
    item: BusinessItems;
    onhangeShippmentInfos: (item:any)=> void;
}