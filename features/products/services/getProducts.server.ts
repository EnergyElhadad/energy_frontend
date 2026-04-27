import { Axios } from '@/core/lib/axios-server';
import { ProductsResponse } from '@/features/products/types/productsResponse';
import { ProductsQueryParams } from '../types/productsQueryParams';

export const getProducts = async (params: ProductsQueryParams = {}): Promise<ProductsResponse> => {
  const axios = await Axios();

  const response = await axios.get<ProductsResponse>(`/products/items/`, {
    params: {
      ...params,
      page_size: params.page_size || 9,
    },
  });

  return response.data;
};
