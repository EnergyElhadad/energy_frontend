import { QualityIcon } from '@/shared/components/icons/Quality';
import { SaftyPayIcon } from '@/shared/components/icons/SaftyPay';
import { SupportIcon } from '@/shared/components/icons/Support';
import { useTranslations } from 'next-intl';

import { WhyChooseCard } from './components/WhyChooseCard';

export const WhySection = () => {
  const t = useTranslations('WhyChooseUs');

  return (
    <section className="mt-10 sm:mt-20 md:mt-40.75">
      <div className="mx-auto mb-10 max-w-100 text-center sm:max-w-[67%]">
        <h3 className="text-WetGray mb-4 text-2xl font-bold md:text-[32px]">{t('header_title')}</h3>
        <p className="text-WetGray text-base leading-7 font-medium">{t('header_description')}</p>
      </div>
      <div className="flex flex-col items-stretch gap-4 md:flex-row">
        <WhyChooseCard icon={<QualityIcon />} title={t('quality_title')} description={t('quality_content')} />
        <WhyChooseCard icon={<SupportIcon />} title={t('support_title')} description={t('support_content')} />
        <WhyChooseCard icon={<SaftyPayIcon />} title={t('secure_payment_title')} description={t('secure_payment_content')} />
      </div>
    </section>
  );
};
