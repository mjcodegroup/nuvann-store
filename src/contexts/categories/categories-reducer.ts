import {State, Action} from './types';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_CATEGORIES': {
            return { ...state, categories: action.value };
        }
        default: {
            return state;
        }
    }
}