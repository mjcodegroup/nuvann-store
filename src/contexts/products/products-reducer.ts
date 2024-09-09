import {State, Action} from './types';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_PRODUCTS': {
            return { ...state, products: action.value };
        }
        case 'SET_PRODUCT_DETAILS': {
            return { ...state, product: action.value };
        }
        case 'SET_LOADING': {
            return { ...state, isLoading: action.value };
        }
        default: {
            return state;
        }
    }
}