import { Action, State } from "./types";

export const countriesReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_COUNTRIES':
            return {
                ...state,
                countries: action.value
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.value
            };
        default:
            return state;
    }
};