import { Product, ProductsData } from "@/contexts/products/types";

export interface HomeProps {
    heroImages: string[];
    jumbotronData: any[];
    onRedirectToProductDetails: (id: string) => void;
    products: ProductsData;    
}
