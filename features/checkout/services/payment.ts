import { Axios } from '@/core/lib/axios';

export interface PaymentMethod {
  id: number;
  name: string;
  is_available: boolean;
}

// The API returns an array directly based on user request
export type PaymentMethodsResponse = PaymentMethod[];

export const getPaymentMethods = async (): Promise<PaymentMethodsResponse> => {
  const res = await Axios.get('/payment-methods/');
  return res.data;
};
