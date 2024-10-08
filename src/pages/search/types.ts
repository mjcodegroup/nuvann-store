import { Category } from "@/contexts/categories/types";

export interface SearchProps {
    loading: boolean;
    products: any;
    searchQuery: string;
    productCount: number;
    onRedirectToProductDetails: (id: number | string) => void;
    categories: any;
    onChangeFilter: (category_id: string, in_promotion: boolean) => void;
    defaultCheckedPromotion?: boolean;
}

export interface ProductListProps {
    products: any;
    loading: boolean;
    onRedirectToProductDetails: (id: string| number) => void;
}