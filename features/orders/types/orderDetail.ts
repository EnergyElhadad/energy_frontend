export interface OrderCity {
  id: number;
  name: string;
}

export interface OrderCountry {
  id: number;
  name: string;
}

export interface OrderAddress {
  id: number;
  city: OrderCity;
  country: OrderCountry;
  area: string;
  street: string;
  building: string;
  apartment: string;
  notes: string;
  is_default: boolean;
  created_at: string;
}

export interface OrderPaymentMethod {
  id: number;
  name: string;
  is_available: boolean;
}

export interface OrderProduct {
  id: number;
  name: string;
  primary_image: string | null;
}

export interface OrderItem {
  id: number;
  product: OrderProduct;
  quantity: number;
  unit_price_at_purchase: string;
  total_price: string;
}

export interface OrderDetail {
  order_number: string;
  payment_method: OrderPaymentMethod | null;
  address: OrderAddress | null;
  total_amount: string;
  shipping_cost: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  items: OrderItem[];
  items_count: number;
  created_at: string;
  delivered_at: string | null;
}

export interface OrderDetailResponse {
  message: string;
  status: boolean;
  result: OrderDetail;
}
