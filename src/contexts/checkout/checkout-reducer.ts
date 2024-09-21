import { Action, State } from "./types";

export function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'SET_CHECKOUT': {
            return { ...state, checkout: action.value };
        }
        case 'SET_LOADING': {
            return { ...state, loading: action.value };
        }
        default: {
            return state;
        }
    }
}