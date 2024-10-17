import React, { createContext, useMemo } from 'react';
import { User } from '@auth0/auth0-react';
import { reducer } from './seller-details-reducer';
import { SellersDetailsContextProps, State } from './types';

export const SellersDetailsContext = createContext<SellersDetailsContextProps>(
    {} as SellersDetailsContextProps
);

const initialState: State = {
    seller: {} as User,
    seller_details_loader: false,
    update_Seller_loader: false,
};

export function SellerDetailsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <SellersDetailsContext.Provider value={value}>
            {children}
        </SellersDetailsContext.Provider>
    );
}

export function useSellerDetails() {
    const context = React.useContext(SellersDetailsContext);
    if (!context) {
        throw new Error('useSeller must be used within an SellersProvider');
    }
    return context;
}
