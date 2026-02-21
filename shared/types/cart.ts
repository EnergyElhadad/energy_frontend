export interface CartProduct {
  id: number;
  name: string;
  price: string;
  offer_price: number;
  is_active: boolean;
  primary_image: string;
}

export interface CartItemAPI {
  id: number;
  product: CartProduct;
  quantity: number;
  item_total: number;
  created_at: string;
}

export interface CartDiscountBreakdown {
  original_total: string;
  offer_discount: string;
  subtotal_after_offers: string;
  promo_code: string | null;
  promo_discount: string;
  total_savings: string;
  final_total: string;
}

export interface CartSummary {
  id: number;
  items: CartItemAPI[];
  items_count: number;
  discount_breakdown: CartDiscountBreakdown;
  cart_total: number;
  status: string;
  created_at: string;
}

export interface CartResponse {
  message: string;
  status: boolean;
  result: CartSummary;
}
export interface Product {
  id: string | number;
  title: string;
  category: string;
  image: string;
  price?: number;
}

export interface CartItem extends Product {
  quantity: number;
  itemTotal?: number;
}

export interface UseCartReturn {
  items: CartItem[];
  count: number;
  cartTotal: number;
  discountBreakdown?: CartDiscountBreakdown;
  addItem: (product: Product, quantity?: number, options?: { onSuccess?: () => void }) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  isAddingToCart?: boolean;
}

export interface OrderSummaryDiscountBreakdown {
  original_total: string;
  offer_discount: string;
  promo_discount: string;
  promo_code: string | null;
  total_savings: string;
  final_total: string;
}

export interface OrderSummaryResult {
  subtotal: string;
  discount_total: string;
  cart_total: string;
  shipping_cost: string;
  total_amount: string;
  discount_breakdown: OrderSummaryDiscountBreakdown;
}

export interface OrderSummaryResponse {
  message: string;
  status: boolean;
  result: OrderSummaryResult;
}
