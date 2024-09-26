import React, { createContext, useMemo } from "react";

import { State, Action, CountriesContextProps, Country } from "./types";
import { countriesReducer } from "./countries-reducer";

const initialState: State = {
    countries: [] as Country[],
    isLoading: false
};

export const CountriesContext = createContext<CountriesContextProps>(
    {} as CountriesContextProps
);

export function CountriesProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(countriesReducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return (
        <CountriesContext.Provider value={value}>
            {children}
        </CountriesContext.Provider>
    );
}

export function useCountries() {
    const context = React.useContext(CountriesContext);
    if (!context) {
        throw new Error("useCountries must be used within a CountriesProvider");
    }
    return context;
}