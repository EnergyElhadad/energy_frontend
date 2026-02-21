'use client';

import { useTranslations } from 'next-intl';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { HeaderForm } from '@/features/auth/components/HeaderForm';
import { NewPasswordForm } from '@/features/auth/components/NewPasswordForm';

export default function NewPasswordPage() {
  const t = useTranslations('Auth');

  return (
    <AuthLayout>
      <HeaderForm title={t('new_password_title')} subtitle={t('new_password_subtitle')} />
      <NewPasswordForm />
    </AuthLayout>
  );
}
