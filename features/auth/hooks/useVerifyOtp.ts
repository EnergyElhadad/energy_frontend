'use client';
import { useState, useEffect } from 'react';
import { useRouter } from '@/core/i18n';
import { tryVerifyOtp } from '../services/verifyOtp';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const useVerifyOtp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('verify_phone_number');
    const otpSource = localStorage.getItem('otp_source') || '/signup';

    if (!storedPhoneNumber) {
      toast.error('Phone number not found. Please try again.');
      router.push(otpSource as string);
      return;
    }
    setPhoneNumber(storedPhoneNumber);
  }, [router]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (!phoneNumber) {
      const otpSource = localStorage.getItem('otp_source') || '/signup';
      toast.error('Phone number not found. Please try again.');
      router.push(otpSource as string);
      return;
    }

    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsSubmitting(true);

    try {
      const otpSource = localStorage.getItem('otp_source') || '/signup';
      const response = await tryVerifyOtp({
        phone_number: phoneNumber,
        otp: otp,
      });

      toast.success(response.detail);
      if (otpSource === '/signup') {
        localStorage.removeItem('verify_phone_number');
        localStorage.removeItem('otp_source');
        router.push('/signin');
      } else if (otpSource === '/forgot-password') {
        router.push('/new-password');
      }
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
