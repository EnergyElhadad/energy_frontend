import { Axios } from '@/core/lib/axios';

export interface CancelOrderResponse {
  message: string;
  status: boolean;
}

export const cancelOrder = async (orderNumber: string): Promise<CancelOrderResponse> => {
  const res = await Axios.post(`/orders/${orderNumber}/cancel/`);
  return res.data;
};

export interface RebuyItem {
  product_id: number;
  quantity: number;
}

export interface RebuyOrderResponse {
  message: string;
  status: boolean;
}

export const rebuyOrder = async (items: RebuyItem[]): Promise<RebuyOrderResponse> => {
  const res = await Axios.post('/cart/items/', items);
  return res.data;
};
