import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { HeaderForm } from '@/features/auth/components/HeaderForm';
import { NewPasswordForm } from '@/features/auth/components/NewPasswordForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: t('new_password_title'),
    description: t('new_password_meta_description'),
  };
}

export default async function NewPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Auth');

  return (
    <AuthLayout>
      <HeaderForm title={t('new_password_title')} subtitle={t('new_password_subtitle')} />
      <NewPasswordForm />
    </AuthLayout>
  );
}
