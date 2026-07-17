import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { checkout, CheckoutParams, CheckoutResponse } from '../services/checkout';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useRouter } from '@/core/i18n/routing';
import { trackPurchase } from '@/shared/components/analytics/metaPixelEvents';
import type { CartResponse } from '@/shared/types/cart';

// The backend answers a failed checkout with a generic top-level `message`
// ("خطأ في التحقق من البيانات") plus the actual per-field reasons nested under
// keys like `guest_info`/`guest_address`. Walk the payload and collect every
// leaf message so the user sees what to fix instead of the vague summary.
const collectFieldErrors = (data: unknown): string[] => {
  if (data == null) return [];
  if (typeof data === 'string') return [data];
  if (Array.isArray(data)) return data.flatMap(collectFieldErrors);
  if (typeof data === 'object') {
    return Object.entries(data as Record<string, unknown>)
      .filter(([key]) => !['message', 'status', 'success', 'code', 'detail'].includes(key))
      .flatMap(([, value]) => collectFieldErrors(value));
  }
  return [];
};

export const useCheckout = () => {
  const t = useTranslations('Checkout');
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
        const data = error.response?.data;
        const fieldErrors = collectFieldErrors(data);
        const detail = fieldErrors.length ? fieldErrors.join('\n') : data?.message;
        toast.error(detail || t('checkout_failed'));
      } else {
        toast.error(t('something_went_wrong'));
      }
    },
  });
};
