'use client';
import { useState, useEffect } from 'react';
import { useRouter } from '@/core/i18n';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import type { VerifyOtpValues, VerifyOtpResponse } from '../services/verifyOtp';

export type VerifyOtpConfig = {
  verifyFn: (data: VerifyOtpValues) => Promise<VerifyOtpResponse>;
  onSuccess: (data: { phone_number: string; otp: string }) => void;
  fallbackRoute: string;
};

export const useVerifyOtp = ({ verifyFn, onSuccess, fallbackRoute }: VerifyOtpConfig) => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('verify_phone_number');

    if (!storedPhoneNumber) {
      toast.error('Phone number not found. Please try again.');
      router.push(fallbackRoute);
      return;
    }
    setPhoneNumber(storedPhoneNumber);
  }, [router, fallbackRoute]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (!phoneNumber) {
      toast.error('Phone number not found. Please try again.');
      router.push(fallbackRoute);
      return;
    }

    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await verifyFn({
        phone_number: phoneNumber,
        otp: otp,
      });

      toast.success(response.message || response.detail || 'Verified successfully');
      onSuccess({ phone_number: phoneNumber, otp });
      localStorage.removeItem('verify_phone_number');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Verification failed';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    otp,
    handleOtpChange,
    handleSubmit,
    isSubmitting,
    phoneNumber,
  };
};
