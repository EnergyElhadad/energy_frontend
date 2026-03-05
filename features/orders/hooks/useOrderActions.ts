import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelOrder, rebuyOrder, RebuyItem } from '../services/orderActions';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/core/i18n';
import { AxiosError } from 'axios';

export const useOrderActions = () => {
  const t = useTranslations('OrderDetail');
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: cancel, isPending: isCanceling } = useMutation({
    mutationFn: (orderNumber: string) => cancelOrder(orderNumber),
    onSuccess: (_, orderNumber) => {
      toast.success(t('cancel_success'));
      // Optional: invalidate queries if you have a query key for the order details or list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      // We rely on the page reload or soft navigation to refresh the data since it's a server component
      router.refresh();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || t('cancel_failed'));
    },
  });

  const { mutate: rebuy, isPending: isRebuying } = useMutation({
    mutationFn: (items: RebuyItem[]) => rebuyOrder(items),
    onSuccess: () => {
      toast.success(t('rebuy_success'));
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      router.push('/cart');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || t('rebuy_failed'));
    },
  });

  return {
    cancel,
    isCanceling,
    rebuy,
    isRebuying,
  };
};
