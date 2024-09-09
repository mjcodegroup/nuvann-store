import {State, Action} from './types';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_CART': {
            return { ...state, cart: action.value };
        }
        case 'REMOVE_FROM_CART': {
            return { ...state, cart: action.value };
        }
        default: {
            return state;
        }
    }
}