import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { HeaderForm } from '@/features/auth/components/HeaderForm';
import { VerifyOtpForm } from '@/features/auth/components/VerifyOtpForm';

export default async function VerifyOtpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Auth');
  return (
    <AuthLayout>
      <HeaderForm title={t('verify_title')} subtitle={t('verify_subtitle')} />
      <VerifyOtpForm />
    </AuthLayout>
  );
}
