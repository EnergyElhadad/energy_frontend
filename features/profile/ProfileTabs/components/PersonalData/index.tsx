'use client';
import { useSession } from 'next-auth/react';
import { ProfileTilte } from '../ProfileTilte';
import { PersonalDataCard } from './components/PersonalDataCard';
import { useUpdateProfile } from '@/features/profile/hooks/useUpdateProfile';
import { ChangePhoneModal } from './components/ChangePhoneModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { Button } from '@/shared/components/ui/Button';

export const PersonalData = () => {
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
      <ProfileTilte title="البيانات الشخصية" />

      <div className="flex flex-col gap-3">
        <PersonalDataCard title="الاسم" subtitle={user?.full_name || ''} onSave={handleUpdateName} modalTitle="تعديل الاسم" />
        <PersonalDataCard title="البريد الإلكتروني" subtitle={user?.email || ''} onSave={handleUpdateEmail} modalTitle="تعديل البريد الإلكتروني" inputType="email" />
        <PersonalDataCard
          title="رقم الموبايل"
          subtitle={user?.phone_number || ''}
          customModal={
            <ChangePhoneModal
              trigger={
                <Button variant={'outline'} className="border-signalGray text-signalGray rounded-sm border px-4 py-1 text-sm leading-relaxed font-medium">
                  تعديل
                </Button>
              }
            />
          }
        />
        <PersonalDataCard
          title="كلمة المرور"
          subtitle="**************"
          customModal={
            <ChangePasswordModal
              trigger={
                <Button variant={'outline'} className="border-signalGray text-signalGray rounded-sm border px-4 py-1 text-sm leading-relaxed font-medium">
                  تعديل
                </Button>
              }
            />
          }
        />
      </div>
    </>
  );
};
