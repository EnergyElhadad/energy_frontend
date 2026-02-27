'use client';
import { useRouter } from '@/core/i18n';
import { VerifyOtpForm } from './VerifyOtpForm';
import { tryVerifyForgotPasswordOtp } from '../services/verifyForgotPasswordOtp';

export function VerifyForgotPasswordContent() {
  const router = useRouter();
  return (
    <VerifyOtpForm
      verifyFn={tryVerifyForgotPasswordOtp}
      onSuccess={({ phone_number, otp }) => {
        localStorage.setItem('reset_phone_number', phone_number);
        localStorage.setItem('reset_otp', otp);
        router.push('/new-password');
      }}
      fallbackRoute="/forgot-password"
    />
  );
}
