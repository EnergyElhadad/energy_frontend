import { Axios } from '@/core/lib/axios-server';
import { ContentImage } from '@/features/home/types/contentImage';

interface ContentImageResponse {
  message: string;
  status: boolean;
  result: ContentImage[];
}

export const getContentImages = async (): Promise<ContentImageResponse> => {
  try {
    const axios = await Axios();
    const { data } = await axios.get<ContentImageResponse>(`/content/images/`);
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
