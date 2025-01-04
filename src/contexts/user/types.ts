import { UserRoles } from "@/utils/enums/user.enum";
import { Country } from "../countries/types";
import { AccountStatusEnum } from "@/utils/enums/account-status-enum";

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
    business_account?: BusinessAccount;
    shipping_contact: Partial<ShippingContact>;
}

export interface Address {
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    zipCode?: string;
    country: Country;
    state_or_department: string;
}

export interface BusinessAccount {
    id?: string;
    createdAt?: string;
    deletedAt?: string;
    currency?: Partial<Currency>;
    address?: Address;
    description?: string;
    rating?: number;
    business_name?: string;
    account_status?: AccountStatusEnum;
    payment_details?: Partial<PaymentAccount>;
    business_categories?: string[];
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
    payment_strategy?: string
    payment_account_id?: string
    payment_details_submitted?: boolean
    payment_payouts_enabled?: boolean
    payment_charges_enabled?: boolean
}

export interface PostBecomeSellerRequest {
    country: Country;
    business_name: string;
}

export type ShippingContact = {
    name?: string;
    phoneNumber?: string;
}