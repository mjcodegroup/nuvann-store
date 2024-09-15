import { Category } from "@/contexts/categories/types";

export interface ProductProps {
    product?: any;
    fullLoading?: boolean;
    onSelectedShippingInfo: (selectedShippingInfo: any) => void;
    onSelectedSize: (size: any) => void;
    sectedSize: any;
    onError: boolean;
    qty: number;
    isLoading: boolean;
    selectedShippingInfo: any;
    selectedSize: any;
    onSelectedColor: (color: any) => void;
    selectedColor: any;
    onChangeQuantity: (qty: number) => void;
    onIncrement: () => void;
    onDecrement: () => void;
    onAddToCart: () => void;
    onPurchase: () => void;
}

export interface MoreDetailsProps {
    description?: string;
    pro_country?: any
    pro_seller?:string;
    pro_categories?: Category[]
}

export interface DetailsProps {
    productInfos: any;
    onError: boolean;
    qty: number;
    isLoading: boolean;
    onSelectedShippingInfo: (selectedShippingInfo: any) => void;
    selectedShippingInfo: any;
    onSelectedSize: (size: any) => void;
    selectedSize: any;
    onSelectedColor: (color: any) => void;
    selectedColor: any;
    onChangeQuantity: (qty: number) => void;
    onIncrement: () => void;
    onDecrement: () => void;
    onAddToCart: () => void;
    onPurchase: () => void;
}


export interface ContainerInfosProps {
    product: any;
    onSelectedShippingInfo: (selectedShippingInfo: any) => void;
    onError: boolean;
    qty: number;
    isLoading: boolean;
    selectedShippingInfo: any;
    onSelectedSize: (size: any) => void;
    selectedSize: any;
    onSelectedColor: (color: any) => void;
    selectedColor: any;
    onChangeQuantity: (qty: number) => void;
    onIncrement: () => void;
    onDecrement: () => void;
    onAddToCart: () => void;
    onPurchase: () => void;
  }