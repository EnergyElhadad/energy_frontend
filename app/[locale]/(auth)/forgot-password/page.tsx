import { Metadata } from 'next';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { HeaderForm } from '@/features/auth/components/HeaderForm';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ForgetPasswordForm } from '@/features/auth/components/ForgetPasswordForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: t('forget_password_title'),
    description: t('forget_password_meta_description'),
  };
}

export default async function SigninPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Auth');
  return (
    <AuthLayout>
      <HeaderForm title={t('forget_password_title')} subtitle={t('forget_password_subtitle')} />
      <ForgetPasswordForm />
    </AuthLayout>
  );
}
