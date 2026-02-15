import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAddress, AddAddressPayload } from '../services/address';
import { toast } from 'sonner';

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddAddressPayload) => addAddress(data),
    onSuccess: () => {
      toast.success('تم إضافة العنوان بنجاح');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'حدث خطأ أثناء إضافة العنوان');
    },
  });
};
