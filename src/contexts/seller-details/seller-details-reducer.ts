import { State, Action } from './types';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_SELLER_DETAILS': {
            return { ...state, seller: action.value };
        }
        case 'SET_SELLER_DETAILS_LOADER': {
            return { ...state, seller_details_loader: action.value };
        }
        default: {
            return state;
        }
    }
}
