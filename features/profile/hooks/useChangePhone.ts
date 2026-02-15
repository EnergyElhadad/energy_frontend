import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { requestChangePhone, confirmChangePhone } from '../services/changePhone';
import { RequestChangePhonePayload, ConfirmChangePhonePayload } from '../services/types';
import { isAxiosError } from 'axios';
import { useLogout } from '@/features/auth/hooks/useLogout';

export const useChangePhone = () => {
  const { data: session } = useSession();
  const { logout } = useLogout();

  const requestChangeMutation = useMutation({
    mutationFn: async (data: RequestChangePhonePayload) => {
      if (!session?.user?.accessToken) {
        throw new Error('User is not authenticated');
      }
      return requestChangePhone(data, session.user.accessToken);
    },
    onSuccess: data => {
      if (data.status) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || 'حدث خطأ أثناء طلب تغيير رقم الهاتف';
        toast.error(message);
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  const confirmChangeMutation = useMutation({
    mutationFn: async (data: ConfirmChangePhonePayload) => {
      if (!session?.user?.accessToken) {
        throw new Error('User is not authenticated');
      }
      return confirmChangePhone(data, session.user.accessToken);
    },
    onSuccess: data => {
      if (data.status) {
        toast.success(data.message);
        logout({ callbackUrl: '/signin' });
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || 'حدث خطأ أثناء تأكيد تغيير رقم الهاتف';
        toast.error(message);
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  return {
    requestChangePhone: requestChangeMutation.mutateAsync,
    isRequesting: requestChangeMutation.isPending,
    confirmChangePhone: confirmChangeMutation.mutateAsync,
    isConfirming: confirmChangeMutation.isPending,
  };
};
