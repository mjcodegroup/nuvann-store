import { Category } from "@/contexts/categories/types";
import { ProductsData } from "@/contexts/products/types";

export interface HomeProps {
    loader: boolean;
    heroImages: string[];
    jumbsData: any[];
    onRedirectToProductDetails: (id: string) => void;
    products: ProductsData;
    categories: Category[];  
}
