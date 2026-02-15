import { Axios } from '@/core/lib/axios';

interface ApplyPromoParams {
  code: string;
}

interface ApplyPromoResponse {
  message: string;
  status: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
}

export const applyPromoCode = async ({ code }: ApplyPromoParams): Promise<ApplyPromoResponse> => {
  const res = await Axios.post('/discounts/apply-promo/', { code });
  return res.data;
};
