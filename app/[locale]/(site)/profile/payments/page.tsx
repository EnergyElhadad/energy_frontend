import { ProfilePayments } from '@/features/profile/ProfileTabs/components/ProfilePayments.tsx';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'المدفوعات',
};

export default function ProfilePaymentsPage() {
  return <ProfilePayments />;
}
