'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/core/i18n';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { HeaderForm } from '@/features/auth/components/HeaderForm';
import { VerifyOtpForm } from '@/features/auth/components/VerifyOtpForm';
import { tryVerifyForgotPasswordOtp } from '@/features/auth/services/verifyForgotPasswordOtp';

export default function VerifyForgotPasswordPage() {
  const t = useTranslations('Auth');
  const router = useRouter();

  return (
    <AuthLayout>
      <HeaderForm title={t('verify_title')} subtitle={t('verify_subtitle')} />
      <VerifyOtpForm
        verifyFn={tryVerifyForgotPasswordOtp}
        onSuccess={({ phone_number, otp }) => {
          localStorage.setItem('reset_phone_number', phone_number);
          localStorage.setItem('reset_otp', otp);
          router.push('/new-password');
        }}
        fallbackRoute="/forgot-password"
      />
    </AuthLayout>
  );
}
