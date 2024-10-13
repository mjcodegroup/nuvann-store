import { Category } from "@/contexts/categories/types";
import React from "react";

export interface SearchProps {
    loading: boolean;
    products: any;
    searchQuery: string;
    productCount: number;
    onRedirectToProductDetails: (id: number | string) => void;
    categories: any;
    onChangeFilter: (category_id: string, in_promotion: boolean) => void;
    defaultCheckedPromotion?: boolean;
    openMobileFilter: boolean;
    setOpenMobileFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProductListProps {
    products: any;
    loading: boolean;
    onRedirectToProductDetails: (id: string| number) => void;
}

export interface MobileFiltersProps {
    searchQuery: string;
    resultCount: number;
    categories: any;
    onChangeFilters: (category_id: string, in_promotion: boolean) => void;
    defaultCheckedPromotion?: boolean;
    openModalFilter: boolean;
    setOpenMobileFilter: React.Dispatch<React.SetStateAction<boolean>>;
}