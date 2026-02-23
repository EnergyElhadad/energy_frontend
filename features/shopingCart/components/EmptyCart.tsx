'use client';

import { Link } from '@/core/i18n';
import { BagIcon } from '@/shared/components/icons/Bag';
import { useTranslations } from 'next-intl';

export const EmptyCart = () => {
  const t = useTranslations('Cart');
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-50">
        <BagIcon className="text-stroke h-16 w-16" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{t('empty_title')}</h2>
      <p className="text-signalGray mb-8 max-w-md">{t('empty_desc')}</p>
      <Link
        href="/products"
        className="bg-primary hover:bg-primary/90 inline-flex h-12 w-full max-w-[200px] items-center justify-center rounded-lg px-6 font-semibold text-white transition-colors"
      >
        {t('browse_products')}
      </Link>
    </div>
  );
};
