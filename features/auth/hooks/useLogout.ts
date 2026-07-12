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
      // Redirect client-side: the server sits behind a proxy that doesn't
      // forward the original Host header, so a server-derived redirect
      // resolves to https://0.0.0.0:3000 instead of the site origin.
      await signOut({ redirect: false });
      window.location.href = callbackUrl;
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
