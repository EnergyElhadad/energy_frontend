import { Axios as AxiosClient } from '@/core/lib/axios';

export interface Review {
  id: number;
  user_name: string | null;
  product: number;
  product_name: string;
  rating: number;
  comment: string;
  is_reviewed: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewsResponse {
  message: string;
  status: boolean;
  result: Review[];
}

export const getProductRatings = async (productId: number): Promise<Review[]> => {
  const response = await AxiosClient.get<ReviewsResponse>(`/ratings/list/?product_id=${productId}`);
  return response.data.result;
};

export const createRating = async (productId: number, rating: number, comment: string) => {
  // Placeholder as endpoint was not provided
  const response = await AxiosClient.post('/ratings/add-rating/', { product: productId, rating, comment });
  return response.data;
};
