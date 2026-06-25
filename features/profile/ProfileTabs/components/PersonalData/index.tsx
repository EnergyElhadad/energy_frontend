'use client';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { ProfileTilte } from '../ProfileTilte';
import { PersonalDataCard } from './components/PersonalDataCard';
import { useUpdateProfile } from '@/features/profile/hooks/useUpdateProfile';
import { ChangePhoneModal } from './components/ChangePhoneModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { Button } from '@/shared/components/ui/Button';

export const PersonalData = () => {
  const t = useTranslations('Profile');
  const { data: session } = useSession();
  const user = session?.user;
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const handleUpdateName = async (name: string) => {
    await updateProfile({ full_name: name });
  };

  const handleUpdateEmail = async (email: string) => {
    await updateProfile({ email });
  };

  return (
    <>
      <ProfileTilte title={t('personal_data')} />

      <div className="flex flex-col gap-3">
        <PersonalDataCard title={t('name')} subtitle={user?.full_name || ''} onSave={handleUpdateName} modalTitle={t('edit_name')} />
        <PersonalDataCard title={t('email')} subtitle={user?.email || ''} onSave={handleUpdateEmail} modalTitle={t('edit_email')} inputType="email" />
        <PersonalDataCard
          title={t('phone')}
          subtitle={user?.phone_number || ''}
          customModal={
            <ChangePhoneModal
              trigger={
                <Button variant={'outline'} className="border-signalGray text-signalGray rounded-sm border px-4 py-1 text-sm leading-relaxed font-medium">
                  {t('edit')}
                </Button>
              }
            />
          }
        />
        <PersonalDataCard
          title={t('password')}
          subtitle="**************"
          customModal={
            <ChangePasswordModal
              trigger={
                <Button variant={'outline'} className="border-signalGray text-signalGray rounded-sm border px-4 py-1 text-sm leading-relaxed font-medium">
                  {t('edit')}
                </Button>
              }
            />
          }
        />
      </div>
    </>
  );
};
