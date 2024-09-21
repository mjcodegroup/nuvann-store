import { OrderResumeData } from "@/components/order-resume";
import { User } from "@/contexts/user/types";

export interface CheckoutProps {
    orderResume: OrderResumeData;
    userInfos: User;
    onChangeAddress: () => void;
    onAddAddress: () => void;
}

export interface CardAddressProps {
    user: User;
    onChangeAddress: () => void;
    onAddAddress: () => void;
}