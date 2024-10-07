import { Category } from "@/contexts/categories/types";

export interface SearchProps {
    loading: boolean;
    products: any;
    searchQuery: string;
    productCount: number;
    onRedirectToProductDetails: (id: number | string) => void;
    categories: any;
    onSelectCategory: (category: Category) => void;
}

export interface ProductListProps {
    products: any;
    loading: boolean;
    onRedirectToProductDetails: (id: string| number) => void;
}