import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkout, CheckoutParams, CheckoutResponse } from '../services/checkout';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useRouter } from '@/core/i18n/routing';
import { trackPurchase } from '@/shared/components/analytics/metaPixelEvents';
import type { CartResponse } from '@/shared/types/cart';

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<CheckoutResponse, Error, CheckoutParams>({
    mutationFn: checkout,
    onSuccess: data => {
      // Purchase = order placed (agreed granularity: for online payments the
      // user leaves for the gateway and there is no return page to track, so
      // this is the last frontend-controlled moment). Read the cart cache for
      // the contents BEFORE invalidating it; fbq delivers via sendBeacon, so
      // the event survives the payment-link redirect below.
      const cart = queryClient.getQueryData<CartResponse>(['cart']);
      const backendTotal = Number(data.result.total_amount);
      trackPurchase({
        orderNumber: data.result.order_number,
        value: Number.isFinite(backendTotal) ? backendTotal : (cart?.result?.cart_total ?? 0),
        contents: cart?.result?.items?.map(item => ({ id: item.product.id, quantity: item.quantity })) ?? [],
      });

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
