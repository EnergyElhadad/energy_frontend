'use client';
import { useState, useEffect } from 'react';
import { tryResendOtp } from '../services/resendOtp';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const useResendOtp = () => {
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleResendOtp = async () => {
    if (!canResend) return;

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
        setTimer(60);
        setCanResend(false);
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
    timer,
    canResend,
  };
};
