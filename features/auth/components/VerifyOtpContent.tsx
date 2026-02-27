'use client';
import { useRouter } from '@/core/i18n';
import { VerifyOtpForm } from './VerifyOtpForm';
import { tryVerifyOtp } from '../services/verifyOtp';

export function VerifyOtpContent() {
  const router = useRouter();
  return <VerifyOtpForm verifyFn={tryVerifyOtp} onSuccess={() => router.push('/signin')} fallbackRoute="/signup" />;
}
