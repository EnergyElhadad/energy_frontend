import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyPromoCode } from '../services/promo';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

export const usePromoCode = () => {
  const queryClient = useQueryClient();

  const { mutate: applyPromo, isPending } = useMutation({
    mutationFn: applyPromoCode,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Invalid promo code');
      } else {
        toast.error('Something went wrong');
      }
    },
  });

  return {
    applyPromo,
    isPending,
  };
};
