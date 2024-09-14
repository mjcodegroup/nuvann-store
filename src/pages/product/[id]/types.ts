import { Category } from "@/contexts/categories/types";

export interface ProductProps {
    product?: any;
    fullLoading?: boolean;
}

export interface MoreDetailsProps {
    description?: string;
    pro_country?: any
    pro_seller?:string;
    pro_categories?: Category[]
    // pro_subCategory?:any;
}