import { State, Action } from './types';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ORDERS': {
            return { ...state, orders: action.value };
        }
        default:
            return state;
    }
}
