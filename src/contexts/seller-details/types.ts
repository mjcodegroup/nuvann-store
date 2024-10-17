import { User } from "@auth0/auth0-react";

export interface State {
    seller: User;
    seller_details_loader: boolean;
    update_Seller_loader: boolean;
}

export type Action = 
    | {
         type: 'SET_SELLER_DETAILS'; value: User;
    }
    | {
         type: 'SET_SELLER_DETAILS_LOADER'; value: boolean;
    };

export interface SellersDetailsContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}
