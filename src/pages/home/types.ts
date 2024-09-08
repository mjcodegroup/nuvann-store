import { Category } from "@/contexts/categories/types";
import { Product, ProductsData } from "@/contexts/products/types";

export interface HomeProps {
    heroImages: string[];
    jumbsData: any[];
    onRedirectToProductDetails: (id: string) => void;
    products: ProductsData;
    categories: Category[];  
}
