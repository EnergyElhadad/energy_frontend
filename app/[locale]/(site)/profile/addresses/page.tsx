import { ProfileAddresses } from '@/features/profile/ProfileTabs/components/ProfileAddresses';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'العناوين',
};

export default function ProfileAddressesPage() {
  return <ProfileAddresses />;
}
