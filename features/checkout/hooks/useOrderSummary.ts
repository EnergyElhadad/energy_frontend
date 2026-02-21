'use client';

import { useQuery } from '@tanstack/react-query';
import { getOrderSummary } from '@/features/shopingCart/services/cart';
import type { OrderSummaryResult } from '@/shared/types/cart';

interface UseOrderSummaryParams {
  addressId?: number | null;
  cityId?: number | null;
}

export const useOrderSummary = ({ addressId, cityId }: UseOrderSummaryParams) => {
  const hasParams = !!addressId || !!cityId;

  const { data, isLoading } = useQuery({
    queryKey: ['order-summary', addressId, cityId],
    queryFn: () => getOrderSummary({ addressId, cityId }),
    enabled: hasParams,
  });

  const summary: OrderSummaryResult | undefined = data?.result;

  return {
    summary,
    isLoading: hasParams ? isLoading : false,
  };
};
