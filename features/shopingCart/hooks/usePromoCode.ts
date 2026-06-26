import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyPromoCode } from '../services/promo';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useTranslations } from 'next-intl';

export const usePromoCode = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Cart');

  const { mutate: applyPromo, isPending } = useMutation({
    mutationFn: applyPromoCode,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['order-summary'] });
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(t('promo_invalid'));
      } else {
        toast.error(t('promo_error'));
      }
    },
  });

  return {
    applyPromo,
    isPending,
  };
};
