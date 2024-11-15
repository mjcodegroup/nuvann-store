import { State, Action } from './types';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_SELLER_PRODUCTS': {
            return { ...state, products: action.value };
        }
        case 'SET_SELLER_PRODUCTS_LOADER': {
            return { ...state, seller_products_loader: action.value };
        }
        default: {
            return state;
        }
    }
}
