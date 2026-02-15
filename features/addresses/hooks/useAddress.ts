import { useQuery } from '@tanstack/react-query';
import { getAddress, Address } from '../services/address';

export const useAddress = (id: number | null) => {
  return useQuery({
    queryKey: ['address', id],
    queryFn: () => getAddress(id!),
    enabled: !!id,
  });
};
