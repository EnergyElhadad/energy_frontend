import { useTranslations } from 'next-intl';
import React from 'react';
import { HeaderWhyChooseUs } from './components/HeaderWhyChooseUs';
import { QualityIcon } from '@/shared/components/icons/Quality';
import { SupportIcon } from '@/shared/components/icons/Support';
import { SaftyPayIcon } from '@/shared/components/icons/SaftyPay';
import { CardWhyChooseUs } from './components/CardWhyChooseUs';

export const WhyChooseUs = () => {
  const t = useTranslations('WhyChooseUs');

  return (
    <section className="bg-Background py-4 md:py-10" aria-labelledby="why-choose-us-heading ">
      <div className="container">
        <div className="mx-auto min-h-29 max-w-7xl px-4">
          <HeaderWhyChooseUs />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <CardWhyChooseUs className="flex-col items-center *:text-center" title={t('quality_title')} content={t('quality_content')} icon={<QualityIcon />} />
            <CardWhyChooseUs className="flex-col items-center *:text-center" title={t('support_title')} content={t('support_content')} icon={<SupportIcon />} />
            <CardWhyChooseUs className="col-span-2 md:col-span-1" title={t('secure_payment_title')} content={t('secure_payment_content')} icon={<SaftyPayIcon />} />
          </div>
        </div>
      </div>
    </section>
  );
};
