export interface OrderItem {
  id: string;
  name: string;
  description: string;
  images: OrderItemImage[];
  price: number;
  properties: OrderItemProperty;
  available_amount: number;
}

export interface OrderItemImage {
  id: string;
  title: string;
  url: string;
  alt: string;
}

export interface OrderItemProperty {
  key: string;
  value: string;
  quantity: number;
}


export interface Order {
  id: string;
  product: OrderItem;
  quantity: number;
  currency: string;
  status: string;
  properties: OrderProperties;
  seller: Seller;
  unit_price: number;
  sub_total: number;
  tax_amount: number;
  shipping_cost: number;
  unit_discount_amount: number;
  total_discount_amount: number;
  unit_price_with_discount: number;
  total_price: number;
  payment_method: string;
  shipping_address: ShippingAddress;
  order_item_status_logs: OrderItemStatusLog;
  shipping_tracking_data: ShippingTrackingData;
}

export interface OrderProperties {
  additionalProp1: OrderProperty;
  additionalProp2: OrderProperty;
  additionalProp3: OrderProperty;
}

export interface OrderProperty {
  key: string;
  value: string;
  quantity: number;
}

export interface Seller {
  name: string;
  country: Country;
}

export interface Country {
  code: string;
  name: string;
}

export interface ShippingAddress {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  country: Country;
  state_or_department: string;
}

export interface OrderItemStatusLog {
  id: string;
  deletedAt: string;
  description: string;
  occurred_on: string;
  order_item_status: string;
}

export interface ShippingTrackingData {
  company_name: string;
  company_url: string;
  tracking_id: string;
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
