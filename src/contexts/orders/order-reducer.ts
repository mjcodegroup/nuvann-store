import { State, Action } from './types';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ORDERS': {
            return { ...state, orders: action.value };
        }
        case 'SET_ORDER_LOADER': {
            return { ...state, order_loader: action.value };
        }
        case 'SET_UPDATE_ORDER_LOADER': {
            return { ...state, update_order_loader: action.value };
        }
        case 'SET_CONFIRM_RECEIPT_LOADER': {
            return { ...state, confirm_receipt_loader: action.value };
        }
        default: {
            return state;
        }
    }
}
