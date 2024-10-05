export interface State {
    products: ProductsData;
    product: ProductDetails;
    isLoading: boolean;
}

export type Action =
    | {
        type: 'SET_PRODUCTS';
        value: ProductsData;
    }
    | {
        type: 'SET_PRODUCT_DETAILS';
        value: ProductDetails;
    }
    | {
        type: 'SET_LOADING';
        value: boolean;
    };

export interface ProductsContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}


export interface ProductsData {
    items: Product[];
    current_page: number;
    total_pages: number;
    total_items: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    images?: ImageMedia[];
    prices: Prices;
    available_amount: number;
}

export type ImageMedia = {
    id?: number;
    title?: string;
    url?: string;
    alt?: string;
}

export type Prices ={
    current_price?: Price;
    original_price?: Price;
}
export type Price ={
    raw: number;
    formatted: string;
    discount?: Discount
}

export type Discount = {
    percent: number;
    value: number;
}

// Details
export interface ProductDetails extends Product {
    category: any;
    seller: any;
    properties: any;
    shipments: any;
    sold_amount: number;
    available_countries: any;
}

export interface getProductsParams {
    page?: number;
    size?: number;
    search?: string;
    categoryId?: string;
    in_promotion?: boolean;
    new_products?: boolean;
    seller_business_account_id?: number;
}
