import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { updateProfile } from '../services/updateProfile';
import { isAxiosError } from 'axios';

export const useUpdateProfile = () => {
  const { data: session, update } = useSession();

  return useMutation({
    mutationFn: async (data: { full_name?: string; email?: string }) => {
      if (!session?.user?.accessToken) {
        throw new Error('User is not authenticated');
      }
      return updateProfile(data, session.user.accessToken);
    },
    onSuccess: data => {
      toast.success(data.message);
      update({
        ...session,
        user: {
          ...session?.user,
          ...data.result,
        },
      });
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || 'حدث خطأ أثناء تحديث الملف الشخصي';
        toast.error(message);
      }
    },
  });
};
