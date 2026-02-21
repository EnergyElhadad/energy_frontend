import { Axios } from '@/core/lib/axios';

export interface AuthenticatedCheckoutParams {
  payment_method_id: number;
  address_id: number;
}

export interface GuestInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface GuestAddress {
  city_id: number;
  area: string;
  street: string;
  building: string;
  apartment: string;
  notes?: string;
}

export interface GuestCheckoutParams {
  payment_method_id: number;
  guest_info: GuestInfo;
  guest_address: GuestAddress;
}

export type CheckoutParams = AuthenticatedCheckoutParams | GuestCheckoutParams;

export interface CheckoutResult {
  order_number: string;
  status: string;
  total_amount?: string;
  payment_link?: string;
  requires_online_payment?: boolean;
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
