export interface State {
    countries: Country[];
    isLoading: boolean;
}

export type Action =
    | {
        type: 'SET_COUNTRIES';
        value: Country[];
    }
    | {
        type: 'SET_LOADING';
        value: boolean;
    };

export interface CountriesContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

export interface Country {
    code: string;
    name: string;
}