import { PersonalData } from '@/features/profile/ProfileTabs/components/PersonalData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'البيانات الشخصية',
};

export default async function ProfilePage() {
  return <PersonalData />;
}
