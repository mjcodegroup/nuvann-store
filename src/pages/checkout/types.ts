import { OrderResumeData } from "@/components/order-resume";
import { CheckoutItem } from "@/contexts/checkout/types";
import { User } from "@/contexts/user/types";

export interface CheckoutProps {
    orderResume: OrderResumeData;
    userInfos: User;
    onChangeAddress: () => void;
    onAddAddress: () => void;
    orderItems: CheckoutItem[];
}

export interface CardAddressProps {
    user: User;
    onChangeAddress: () => void;
    onAddAddress: () => void;
}

export interface CardProductsProps {
    items: CheckoutItem[];
}