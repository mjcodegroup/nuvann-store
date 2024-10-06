import { State, Action } from './types';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ORDER_DETAILS': {
            return { ...state, order: action.value };
        }
        case 'SET_ORDER_DETAILS_LOADER': {
            return { ...state, order_details_loader: action.value };
        }
        default: {
            return state;
        }
    }
}
