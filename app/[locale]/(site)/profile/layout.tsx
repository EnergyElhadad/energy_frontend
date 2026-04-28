import { ProfileSidebar } from '@/features/profile/components/ProfileSidebar';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'ProfilePages' });
  return {
    title: t('profile_title'),
  };
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('ProfilePages');

  return (
    <main className="bg-Background pb-16">
      <div className="container">
        <HeaderPage pageTitle={t('profile_title')} />
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full shrink-0 sm:w-64">
            <ProfileSidebar />
          </div>
          <div className="flex-1 rounded-md bg-white p-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
