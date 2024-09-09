import React, { createContext, useMemo } from "react";
import { ProductDetails, ProductsContextProps, State, ProductsData } from "./types";
import { reducer } from "./products-reducer";

export const ProductsContext = createContext<ProductsContextProps>(
    {} as ProductsContextProps
);

const initialState: State = {
    products: {} as ProductsData,
    product: {} as ProductDetails,
    isLoading: false,
};


export function ProductsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = React.useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context; 
}