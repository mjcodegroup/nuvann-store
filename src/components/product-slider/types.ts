
export interface SliderProps {
    products: any;
    title: string;
    itemToShow: number;
    isnew?: boolean;
    havePromo?:boolean;
    isLoading?: boolean;
    onRedirectToProductDetails:(id: string) => void;
    multipleRows?: boolean;
  }
  
  