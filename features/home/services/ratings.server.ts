import { Axios } from '@/core/lib/axios-server';
import { HomepageReviewsResponse } from './ratings';

export const getServerHomepageRatings = async (): Promise<HomepageReviewsResponse> => {
  try {
    const axios = await Axios();
    const { data } = await axios.get<HomepageReviewsResponse>(`/ratings/list/?show_in_homepage=true`);
    return data;
  } catch (error) {
    console.error('Failed to fetch homepage ratings:', error);
    return {
      message: 'Failed to fetch homepage ratings',
      status: false,
      result: [],
    };
  }
};
