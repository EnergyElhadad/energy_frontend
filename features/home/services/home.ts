import { Axios } from '@/core/lib/axios';
import { HomeFeaturesResponse } from './home.server';

export const getHomeFeaturesClient = async (): Promise<HomeFeaturesResponse> => {
  const response = await Axios.get<HomeFeaturesResponse>(`/content/sections`);
  return response.data;
};
