export interface Order {
  order_number: string;
  total_amount: string;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  created_at: string;
  delivered_at: string | null;
}

export interface OrdersResponse {
  next: string | null;
  previous: string | null;
  count: number;
  num_pages: number;
  current_page: number;
  result: Order[];
  status: boolean;
  other: unknown;
  message: string;
}
