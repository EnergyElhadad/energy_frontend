import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Axios } from '@/core/lib/axios';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = async ({ callbackUrl = '/' }: { callbackUrl?: string }) => {
    setIsLoading(true);
    try {
      await Axios.post('/users/logout');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      await signOut({ callbackUrl });
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
