export interface Order {
  id: string;
  business: Business;
  items: OrderItem[];
  subtotal: number;
  selected_shipment?: SelectedShipment;
}

export interface Business {
  id: string;
  name: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  currency: string;
  status: string;
  sub_total: number;
  unit_price: number;
  unit_discount_amount: number;
  unit_price_with_discount: number;
  total_price: number;
  seller: Seller;
  shipping_address?: ShippingAddress;
  order_item_status_logs: OrderItemStatusLog[];
  created_at: string;
  public_id?: string;
  tax_amount: number;
  shipping_cost?: number;
  payment_method?: string;
  shipping_tracking_data?: ShippingTrackingData;
  shipment_description?: string;
  delivery_code?: string;
}

export interface SelectedShipment {
  id: string;
  price: number;
  currency: string;
  type: string;
  description: string;
  delivery_deadline: string;
  coverage_area: string;
  default_shipment: boolean;
  base_price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: ProductImage[];
  price: number;
  properties?: ProductProperty[];
  available_amount?: number;
}

export interface ProductImage {
  id: string;
  title: string;
  url: string;
  alt: string;
}

export interface ProductProperty {
  additionalProp1: OrderProperty[];
  additionalProp2: OrderProperty[];
  additionalProp3: OrderProperty[];
}

export interface OrderProperty {
  key: string;
  value: string;
}

export interface Seller {
  name: string;
  country: Country;
  business_account_id: string;
  created_at: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface ShippingAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  country: Country;
  state_or_department: string;
}

export interface OrderItemStatusLog {
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
      type: 'SET_ORDERS';
      value: Order[];
    }
  | {
      type: 'SET_ORDER_LOADER';
      value: boolean;
    };

export interface OrdersContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
