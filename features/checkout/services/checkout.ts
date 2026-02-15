import { Axios } from '@/core/lib/axios';

export interface CheckoutParams {
  payment_method_id: number;
  address_id: number;
}

export interface CheckoutResult {
  order_number: string;
  status: string;
}

export interface CheckoutResponse {
  message: string;
  status: boolean;
  result: CheckoutResult;
}

export const checkout = async (data: CheckoutParams): Promise<CheckoutResponse> => {
  const res = await Axios.post('/checkout/', data);
  return res.data;
};
