import { ImageMedia } from "../products/types";

export interface State {
    categories: Category[];
}

export type Action =
    | {
        type: 'SET_CATEGORIES';
        value: Category[];
    }

export interface CategoriesContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    tags: string[];
    image: ImageMedia
}
