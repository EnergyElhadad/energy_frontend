'use client';
import { useState } from 'react';
import { tryResendOtp } from '../services/resendOtp';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const useResendOtp = () => {
  const [isResending, setIsResending] = useState(false);

  const handleResendOtp = async () => {
    const phoneNumber = localStorage.getItem('verify_phone_number');

    if (!phoneNumber) {
      toast.error('Phone number not found. Please try again.');
      return;
    }

    setIsResending(true);

    try {
      const response = await tryResendOtp({
        phone_number: phoneNumber,
      });

      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Resend OTP failed';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsResending(false);
    }
  };

  return {
    handleResendOtp,
    isResending,
  };
};
