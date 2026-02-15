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
      toast.success(data.message);
      // Redirect to a success page or orders page
      // router.push(`/orders/${data.result.order_number}`); // Example redirect
      // For now maybe just redirect to home or clear cart?
      // The requirement says response has order_number/status.
      // Let's assume we redirect to orders page or home for now.
      // Better to ask user where to redirect, but I'll stick to a safe default or just show toast.
      // Actually, usually after checkout we go to order confirmation.
      // I'll leave the redirect commented out or simple redirect to home or orders if page exists.
      router.push('/');
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
