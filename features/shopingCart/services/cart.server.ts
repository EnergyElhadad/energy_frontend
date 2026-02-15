import { Axios as AxiosServer } from '@/core/lib/axios-server';
import { CartResponse } from '@/shared/types/cart';

export const getCartItemsServer = async (): Promise<CartResponse> => {
  const axios = await AxiosServer();
  const res = await axios.get('/cart/');
  return res.data;
};
