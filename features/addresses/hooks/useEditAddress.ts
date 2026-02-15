import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAddress, AddAddressPayload } from '../services/address';
import { toast } from 'sonner';

export const useEditAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AddAddressPayload }) => updateAddress(id, data),
    onSuccess: () => {
      toast.success('تم تعديل العنوان بنجاح');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'حدث خطأ أثناء تعديل العنوان');
    },
  });
};
