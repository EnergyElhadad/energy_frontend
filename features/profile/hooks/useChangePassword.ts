import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { changePassword } from '../services/changePassword';
import { ChangePasswordPayload } from '../services/types';
import { isAxiosError } from 'axios';
import { useLogout } from '@/features/auth/hooks/useLogout';

export const useChangePassword = () => {
  const { data: session } = useSession();
  const { logout } = useLogout();

  return useMutation({
    mutationFn: async (data: ChangePasswordPayload) => {
      if (!session?.user?.accessToken) {
        throw new Error('User is not authenticated');
      }
      return changePassword(data, session.user.accessToken);
    },
    onSuccess: data => {
      if (data.status) {
        logout({ callbackUrl: '/signin' });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || 'حدث خطأ أثناء تغيير كلمة المرور';
        toast.error(message);
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });
};
