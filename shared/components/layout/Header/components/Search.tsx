'use client';

import { useTranslations } from 'next-intl';
import { SearchIcon } from '@/shared/components/icons/Search';

export const Search = () => {
  const t = useTranslations('Header');

  return (
    <div className='hidden sm:flex items-center gap-[10px] border border-Stroke rounded-[8px] h-[40px] py-[11px] px-[18px] w-full max-w-[583px] focus-within:border-primary'>
      <SearchIcon />
      <input className='w-full h-full bg-transparent outline-none placeholder:text-signalGray' type="text" placeholder={t('search_placeholder')} />
    </div>
  );
};