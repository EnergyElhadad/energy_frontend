import { useQuery } from '@tanstack/react-query';
import { getPaymentMethods } from '../services/payment';

export const usePaymentMethods = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: getPaymentMethods,
  });

  return {
    // data is now the array itself
    paymentMethods: data || [],
    isLoading,
    error,
  };
};
