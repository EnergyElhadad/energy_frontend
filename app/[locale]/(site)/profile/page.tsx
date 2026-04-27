import { PersonalData } from '@/features/profile/ProfileTabs/components/PersonalData';
import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'ProfilePages' });
  return {
    title: t('personal_data_title'),
  };
}

export default async function ProfilePage() {
  return <PersonalData />;
}
