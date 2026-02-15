import { Axios } from '@/core/lib/axios-server';
import { Banner } from '@/features/home/types/banner';

interface BannersResponse {
  message: string;
  status: boolean;
  result: Banner[];
}

export const getBanners = async (bannerPlacement: 'footer' | 'header'): Promise<BannersResponse> => {
  try {
    const axios = await Axios();
    const { data } = await axios.get<BannersResponse>(`/content/banners/?placement=${bannerPlacement}`);
    return data;
  } catch (error) {
    console.error('Failed to fetch banners:', error);
    return {
      message: 'Failed to fetch banners',
      status: false,
      result: [],
    };
  }
};
