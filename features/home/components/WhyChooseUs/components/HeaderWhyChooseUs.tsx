import { useTranslations } from 'next-intl';
import React from 'react';

export const HeaderWhyChooseUs = () => {
  const t = useTranslations('WhyChooseUs');
  return (
    <div className="mb-8 text-center">
      <h2 id="why-choose-us-heading " className="text-WetGray mb-4 text-xl font-bold md:text-[1.5rem]">
        {t('header_title')}
      </h2>
      <p className="text-WetGray mx-auto mb-4 max-w-202.5 text-[14px] leading-relaxed font-normal md:text-base md:font-medium">{t('header_description')}</p>
    </div>
  );
};
