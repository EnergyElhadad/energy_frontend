import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAddress } from '../services/address';
import { toast } from 'sonner';

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAddress(id),
    onSuccess: () => {
      toast.success('تم حذف العنوان بنجاح');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'حدث خطأ أثناء حذف العنوان');
    },
  });
};
