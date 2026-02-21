'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/core/i18n';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { HeaderForm } from '@/features/auth/components/HeaderForm';
import { VerifyOtpForm } from '@/features/auth/components/VerifyOtpForm';
import { tryVerifyOtp } from '@/features/auth/services/verifyOtp';

export default function VerifyOtpPage() {
  const t = useTranslations('Auth');
  const router = useRouter();

  return (
    <AuthLayout>
      <HeaderForm title={t('verify_title')} subtitle={t('verify_subtitle')} />
      <VerifyOtpForm verifyFn={tryVerifyOtp} onSuccess={() => router.push('/signin')} fallbackRoute="/signup" />
    </AuthLayout>
  );
}
