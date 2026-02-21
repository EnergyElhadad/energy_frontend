'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter } from '@/core/i18n';
import { createNewPasswordSchema, NewPasswordValues } from '../schemas/newPasswordSchema';
import { tryResetPassword } from '../services/resetPassword';

export function useNewPassword() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [resetData] = useState<{ phone_number: string; otp: string } | null>(() => {
    if (typeof window === 'undefined') return null;
    const phone_number = localStorage.getItem('reset_phone_number');
    const otp = localStorage.getItem('reset_otp');
    if (!phone_number || !otp) return null;
    return { phone_number, otp };
  });

  useEffect(() => {
    if (!resetData) {
      toast.error('Session expired. Please try again.');
      router.push('/forgot-password');
    }
  }, [resetData, router]);

  const newPasswordSchema = createNewPasswordSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordValues) => {
    if (!resetData) {
      toast.error('Session expired. Please try again.');
      router.push('/forgot-password');
      return;
    }

    try {
      const response = await tryResetPassword({
        phone_number: resetData.phone_number,
        otp: resetData.otp,
        new_password: data.new_password,
      });

      if (response.status) {
        toast.success(response.message);
        localStorage.removeItem('reset_phone_number');
        localStorage.removeItem('reset_otp');
        router.push('/signin');
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errorData = error.response?.data;
        const message = errorData?.detail || errorData?.message || 'Password reset failed';
        toast.error(message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    hasResetData: !!resetData,
  };
}
