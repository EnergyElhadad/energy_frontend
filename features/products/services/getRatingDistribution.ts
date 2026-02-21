import { Axios } from '@/core/lib/axios';

export interface RatingDistributionResponse {
  message: string;
  status: boolean;
  result: Record<string, number>;
}

export const getRatingDistribution = async (): Promise<RatingDistributionResponse> => {
  const response = await Axios.get<RatingDistributionResponse>('/ratings/distribution/');
  return response.data;
};
