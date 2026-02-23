import { Axios } from '@/core/lib/axios';

export interface HomepageReview {
  id: number;
  product: number;
  product_name_en: string;
  product_name_ar: string;
  user_name: string;
  rating: number;
  comment: string;
  is_reviewed: boolean;
  created_at: string;
  updated_at: string;
}

export interface HomepageReviewsResponse {
  message: string;
  status: boolean;
  result: HomepageReview[];
}

export const getHomepageRatings = async (): Promise<HomepageReviewsResponse> => {
  try {
    const { data } = await Axios.get<HomepageReviewsResponse>(`/ratings/list/?show_in_homepage=true`);
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
