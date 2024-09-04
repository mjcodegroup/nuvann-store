import React, { createContext, useMemo } from "react";
import { CategoriesContextProps, State, Category } from "./types";
import { reducer } from "./categories-reducer";

export const CategoriesContext = createContext<CategoriesContextProps>(
    {} as CategoriesContextProps
);

const initialState: State = {
    categories: [] as Category[],
};

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}

export function useCategories() {
    const context = React.useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }
    return context; 
}