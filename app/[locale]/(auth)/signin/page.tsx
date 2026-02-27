import { Metadata } from 'next';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { HeaderForm } from '@/features/auth/components/HeaderForm';
import { SigninForm } from '@/features/auth/components/SigninForm';
import { FooterForm } from '@/features/auth/components/FooterForm';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: t('signin_title'),
    description: t('signin_meta_description'),
  };
}

export default async function SigninPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Auth');
  return (
    <AuthLayout>
      <HeaderForm title={t('signin_title')} subtitle={t('signin_subtitle')} />
      <SigninForm />
      <FooterForm title={t('no_account')} linkurl="/signup" linktext={t('signup_button')} />
    </AuthLayout>
  );
}
