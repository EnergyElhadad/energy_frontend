import { Axios } from '@/core/lib/axios-server';
import { OrderDetailResponse } from '../types/orderDetail';

export const getOrderDetail = async (orderNumber: string): Promise<OrderDetailResponse | null> => {
  try {
    const axios = await Axios();
    const { data } = await axios.get(`/orders/${orderNumber}/`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch order ${orderNumber}:`, error);
    return null;
  }
};
