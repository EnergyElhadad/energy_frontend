import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { updateAddress, AddAddressPayload } from '../services/address';
import { toast } from 'sonner';

export const useEditAddress = () => {
  const t = useTranslations('Addresses');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AddAddressPayload }) => updateAddress(id, data),
    onSuccess: () => {
      toast.success(t('edit_success'));
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('edit_error'));
    },
  });
};
