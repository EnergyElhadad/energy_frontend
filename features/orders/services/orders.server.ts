import { Axios } from '@/core/lib/axios-server';
import { OrdersResponse } from '../types/order';

export const getOrders = async ({ page = 1 }: { page?: number }): Promise<OrdersResponse> => {
  try {
    const axios = await Axios();
    const { data } = await axios.get(`/orders/`, {
      params: {
        page,
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return {
      result: [],
      status: false,
      message: 'Failed to fetch orders',
      next: null,
      previous: null,
      current_page: 1,
      num_pages: 1,
      count: 0,
      other: null,
    };
  }
};
