import { ProductsData } from "../products/types";

export interface State {
    products: ProductsData;
    seller_products_loader: boolean;
    update_Seller_loader: boolean;
}

export type Action = 
    | {
         type: 'SET_SELLER_PRODUCTS'; value: ProductsData;
    }
    | {
         type: 'SET_SELLER_PRODUCTS_LOADER'; value: boolean;
    };

export interface SellersDetailsContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}
