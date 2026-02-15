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
    <section className="bg-Background py-10" aria-labelledby="why-choose-us-heading ">
      <div className="container">
        <div className="mx-auto min-h-29 max-w-7xl px-4">
          <HeaderWhyChooseUs />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <CardWhyChooseUs title={t('quality_title')} content={t('quality_content')} icon={<QualityIcon />} />
            <CardWhyChooseUs title={t('support_title')} content={t('support_content')} icon={<SupportIcon />} />
            <CardWhyChooseUs title={t('secure_payment_title')} content={t('secure_payment_content')} icon={<SaftyPayIcon />} />
          </div>
        </div>
      </div>
    </section>
  );
};
