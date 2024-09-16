import {State, Action} from './types';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_USER': {
            return { ...state, user: action.value };
        }
        case 'SET_LOADING': {
            return { ...state, isLoading: action.value };
        }
        default: {
            return state;
        }
    }
}