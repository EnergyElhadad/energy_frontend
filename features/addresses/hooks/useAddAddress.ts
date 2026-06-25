import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { addAddress, AddAddressPayload } from '../services/address';
import { toast } from 'sonner';

export const useAddAddress = () => {
  const t = useTranslations('Addresses');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddAddressPayload) => addAddress(data),
    onSuccess: () => {
      toast.success(t('add_success'));
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('add_error'));
    },
  });
};
