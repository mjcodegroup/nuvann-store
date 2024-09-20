import React, { createContext, useMemo } from "react";
import { CartContextProps, State, Cart } from "./types";
import { reducer } from "./cart-reducer";

export const CartContext = createContext<CartContextProps>(
    {} as CartContextProps
);

const initialState: State = {
    cart: {} as Cart,
    cart_loader: false,
    update_cart_loader: false,
};


export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context; 
}

