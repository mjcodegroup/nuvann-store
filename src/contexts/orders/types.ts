export interface Order {
    id: string;
    status: string;
    date: string;
    sub_total: number;
    shipping_cost: number;
    imageUrl: string;
    total: number;
    items: {
      id: string;
      name: string;
      description: string;
      quantity: number;
      price: number;
      imageUrl: string;
    }[];
  }
  
export interface State {
    orders: Order[];
    order_loader: boolean;
    update_order_loader: boolean;
}

export type Action = 
    | {
         type: 'SET_ORDERS'; value: Order[];
    }
    | {
         type: 'SET_ORDER_LOADER'; value: boolean;
    };

export interface OrdersContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}
