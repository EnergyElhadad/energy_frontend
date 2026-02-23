import { ProfileAddresses } from '@/features/profile/ProfileTabs/components/ProfileAddresses';
import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'ProfilePages' });
  return {
    title: t('addresses_title'),
  };
}

export default function ProfileAddressesPage() {
  return <ProfileAddresses />;
}
