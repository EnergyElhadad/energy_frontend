import { Axios } from '@/core/lib/axios-server';
import { WishlistProductsResponse } from '@/shared/services/wishlist';

export const getWishlistProducts = async (params?: { search?: string; page_size?: number; page?: number }): Promise<WishlistProductsResponse> => {
  const axios = await Axios();
  const response = await axios.get<WishlistProductsResponse>('lists/wishlist/products/', { params });
  return response.data;
};
