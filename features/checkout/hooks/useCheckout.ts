import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkout, CheckoutParams, CheckoutResponse } from '../services/checkout';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useRouter } from '@/core/i18n/routing';

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<CheckoutResponse, Error, CheckoutParams>({
    mutationFn: checkout,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.removeQueries({ queryKey: ['order-summary'] });

      if (data.result.requires_online_payment && data.result.payment_link) {
        window.location.href = data.result.payment_link;
        return;
      }

      toast.success(data.message);
      router.push('/'); // Redirect to home or success page for cash/manual payments
    },
    onError: error => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to populate checkout');
      } else {
        toast.error('Something went wrong');
      }
    },
  });
};
