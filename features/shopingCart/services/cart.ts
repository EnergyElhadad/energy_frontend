import { Axios } from '@/core/lib/axios';
import { CartResponse, OrderSummaryResponse } from '@/shared/types/cart';

interface AddToCartParams {
  product_id: number | string;
  quantity: number;
}

interface AddToCartResponse {
  message: string;
  status: boolean;
}

export const addToCart = async ({ product_id, quantity }: AddToCartParams): Promise<AddToCartResponse> => {
  const res = await Axios.post('/cart/items/', { product_id, quantity });
  return res.data;
};

export const getCartItems = async (): Promise<CartResponse> => {
  const res = await Axios.get('/cart/');
  return res.data;
};

interface UpdateCartItemParams {
  product_id: number | string;
  quantity: number;
}

interface UpdateCartItemResponse {
  message: string;
  status: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
}

export const updateCartItem = async ({ product_id, quantity }: UpdateCartItemParams): Promise<UpdateCartItemResponse> => {
  const res = await Axios.patch('/cart/items/update/', { product_id, quantity });
  return res.data;
};

interface RemoveCartItemResponse {
  message: string;
  status: boolean;
}

interface RemoveCartItemParams {
  product_id: number | string;
}

export const removeCartItem = async ({ product_id }: RemoveCartItemParams): Promise<RemoveCartItemResponse> => {
  const res = await Axios.delete(`/cart/items/remove/`, { data: { product_id } });
  return res.data;
};

interface OrderSummaryParams {
  addressId?: number | null;
  cityId?: number | null;
}

export const getOrderSummary = async ({ addressId, cityId }: OrderSummaryParams): Promise<OrderSummaryResponse> => {
  const params: Record<string, number> = {};
  if (addressId) params.address_id = addressId;
  else if (cityId) params.city_id = cityId;

  const res = await Axios.get('/cart/summary/', { params });
  return res.data;
};
