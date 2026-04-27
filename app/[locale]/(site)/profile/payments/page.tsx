import { ProfilePayments } from '@/features/profile/ProfileTabs/components/ProfilePayments.tsx';
import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'ProfilePages' });
  return {
    title: t('payments_title'),
  };
}

export default function ProfilePaymentsPage() {
  return <ProfilePayments />;
}
