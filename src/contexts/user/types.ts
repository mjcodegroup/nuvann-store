import { UserRoles } from "@/utils/enums/user.enum";
import { Country } from "../countries/types";

export interface State {
    user: User;
    isLoading: boolean;
    token: string | null;
}

export type Action =
    | {
        type: 'SET_USER';
        value: User;
    }
    | {
        type: 'SET_LOADING';
        value: boolean;
    }
    | {
        type: 'SET_TOKEN';
        value: string | null;
    };

export interface UserContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    roles: UserRoles;
    address?: Address;
    phone_number?: string;
    seller_infos: Partial<SellerInfos>;
    shipping_contact: Partial<ShippingContact>;
}

export interface Address {
    street: string;
    number: string;
    complement?: string;
    neighborhood?: string;
    city: string;
    zipCode: string;
    country: Country;
    state_or_department: string;
}

export interface SellerInfos {
    currency?: Partial<Currency>;
    country?: Country;
    document_id?: string;
    business_name?: string;
    payment_account?: Partial<PaymentAccount>;
    seller_terms_and_condition_accepted?: boolean;
    is_onboarding_completed?: boolean;
    is_able_to_sell?: boolean;
}

export interface Currency {
    currencyCode?: string;
    numericCode?: number;
    numericCodeAsString?: string;
    displayName?: string;
    symbol?: string;
    defaultFractionDigits?: number;
}

export interface PaymentAccount {
    strategy?: string
    account_id?: string
    details_submitted?: boolean
    payouts_enabled?: boolean
    charges_enabled?: boolean
}

export interface PostBecomeSellerRequest {
    country: Country;
    business_name: string;
}

export type ShippingContact = {
    name: string;
    phoneNumber: string;
}