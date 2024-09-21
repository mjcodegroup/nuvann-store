import React, { createContext, useMemo } from "react";
import { Checkout, CheckoutContextProps, State } from "./types";
import { reducer } from "./checkout-reducer";

export const CheckoutContext = createContext<CheckoutContextProps>(
    {} as CheckoutContextProps
);

const initialState: State = {
    checkout: {} as Checkout,
    loading: false,
};

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const context = React.useContext(CheckoutContext);
    if (!context) {
        throw new Error("useCheckout must be used within a CheckoutProvider");
    }
    return context;
}