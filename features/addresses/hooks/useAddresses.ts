import { useQuery } from '@tanstack/react-query';
import { getAddresses } from '../services/address';

export const useAddresses = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  });

  return {
    addresses: data || [],
    isLoading,
    error,
  };
};
