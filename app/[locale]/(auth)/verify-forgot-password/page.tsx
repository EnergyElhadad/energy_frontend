import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { HeaderForm } from '@/features/auth/components/HeaderForm';
import { VerifyForgotPasswordContent } from '@/features/auth/components/VerifyForgotPasswordContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: t('verify_title'),
    description: t('verify_otp_meta_description'),
  };
}

export default async function VerifyForgotPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Auth');

  return (
    <AuthLayout>
      <HeaderForm title={t('verify_title')} subtitle={t('verify_subtitle')} />
      <VerifyForgotPasswordContent />
    </AuthLayout>
  );
}
