import { ProfileSidebar } from '@/features/profile/components/ProfileSidebar';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'البروفايل',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-Background pb-16">
      <div className="container">
        <HeaderPage pageTitle="الصفحة الشخصية" />
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
