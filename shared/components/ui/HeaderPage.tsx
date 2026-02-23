import React from 'react';
import { useTranslations } from 'next-intl';

export const HeaderPage = ({ pageTitle }: { pageTitle: string }) => {
  const t = useTranslations('Common');
  return (
    <h1 className="text-primary py-4 text-base font-normal">
      {t('home')} / <span className="text-signalGray"> {pageTitle}</span>
    </h1>
  );
};
