import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { deleteAddress } from '../services/address';
import { toast } from 'sonner';

export const useDeleteAddress = () => {
  const t = useTranslations('Addresses');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAddress(id),
    onSuccess: () => {
      toast.success(t('delete_success'));
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('delete_error'));
    },
  });
};
