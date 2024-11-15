export interface State {
    products: ProductsData;
    newProducts: ProductsData;
    promotionProducts: ProductsData;
    product: ProductDetails;
    isLoading: boolean;
    quickPurchaseLoader: boolean;
}

export type Action =
    | {
        type: 'SET_PRODUCTS';
        value: ProductsData;
    }
    | {
        type: 'SET_NEW_PRODUCTS';
        value: ProductsData;
    }
    | {
        type: 'SET_PROMOTION_PRODUCTS';
        value: ProductsData;
    }
    | {
        type: 'SET_PRODUCT_DETAILS';
        value: ProductDetails;
    }
    | {
        type: 'SET_LOADING';
        value: boolean;
    }
    | {
        type: 'SET_QUICK_PURCHASE_LOADER';
        value: boolean;
    }

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
    id: string;
    name: string;
    description: string;
    images?: ImageMedia[];
    prices: Prices;
    available_amount: number;
    categories: Category[];
}

export type ImageMedia = {
    id?: string;
    title?: string;
    url?: string;
    alt?: string;
}

export type Prices = {
    current_price?: Price;
    original_price?: Price;
}

export type Price = {
    raw: number;
    formatted: string;
    discount: Discount;
}

export type Discount = {
    percent: number;
    value: number;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    tags: string[];
    image: ImageMedia;
}

// Details
export interface ProductDetails extends Product {
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
    category_id?: string;
    in_promotion?: boolean;
    new_products?: boolean;
    seller_business_account_id?: number;
}

export interface ProductDetailsParams {
    id: string;
    [key: string ]: string | undefined
}

export interface PostQuickPurchaseType {
    quantity: number;
    properties?: Properties[] | undefined;
}

type Properties = {
    [key: string ]: string | undefined
}