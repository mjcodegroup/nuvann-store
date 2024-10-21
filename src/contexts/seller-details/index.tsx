import React, { createContext, useMemo } from 'react';
import { reducer } from './seller-details-reducer';
import { SellerInfo, SellersDetailsContextProps, State } from './types';
import { ProductsData } from '../products/types';
import { Seller } from '../orders/types';

export const SellersDetailsContext = createContext<SellersDetailsContextProps>(
    {} as SellersDetailsContextProps
);

const initialState: State = {
    products: {} as ProductsData,
    seller_products_loader: false,
    update_Seller_loader: false,
    seller_info: {}as SellerInfo
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
