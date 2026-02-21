import { Axios } from '@/core/lib/axios-server';
import { Product } from '@/shared/types/product';

export interface HomeFeature {
  id: number;
  title: string;
  products: Product[];
  total_products_count: number;
  order: number;
  created_at: string;
}

export interface HomeFeaturesResponse {
  message: string;
  status: boolean;
  result: HomeFeature[];
}

export const getHomeFeatures = async (): Promise<HomeFeaturesResponse> => {
  try {
    const axios = await Axios();
    const { data } = await axios.get<HomeFeaturesResponse>(`/content/sections`);
    return data;
  } catch (error) {
    console.error('Failed to fetch home features:', error);
    return {
      message: 'Failed to fetch home features',
      status: false,
      result: [],
    };
  }
};
