'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { PersonalData } from './components/PersonalData';
import { ProfileAddresses } from './components/ProfileAddresses';
import { ProfilePayments } from './components/ProfilePayments.tsx';
import { useTranslations } from 'next-intl';

export const ProfileTabs: React.FC = () => {
  const t = useTranslations('ProfileTabs');
  return (
    <Tabs defaultValue="personalData" data-orientation="vertical" className="flex flex-col sm:flex-row">
      <TabsList className="w-full flex-1 flex-row gap-3 rounded-md bg-white p-4 sm:flex-col">
        <TabsTrigger
          className="data-[state=active]:bg-primary bg-Background text-WetGray rounded-md p-3 text-sm font-medium data-[state=active]:text-white"
          value="personalData"
        >
          {t('personal_data')}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary bg-Background text-WetGray rounded-md p-3 text-sm font-medium data-[state=active]:text-white"
          value="addresses"
        >
          {t('addresses')}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary bg-Background text-WetGray rounded-md p-3 text-sm font-medium data-[state=active]:text-white"
          value="payments"
        >
          {t('payments')}
        </TabsTrigger>
      </TabsList>

      <div className="flex-3 rounded-md bg-white p-8">
        <TabsContent value="personalData">
          <PersonalData />
        </TabsContent>
        <TabsContent value="addresses">
          <ProfileAddresses />
        </TabsContent>
        <TabsContent value="payments">
          <ProfilePayments />
        </TabsContent>
      </div>
    </Tabs>
  );
};
