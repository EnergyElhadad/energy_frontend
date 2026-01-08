'use client';

import { useLanguageSwitcher } from '@/shared/hooks/useLanguageSwitcher';
import Image from 'next/image';

export function LanguageSwitcher() {
  const { toggleLanguage, isArabic } = useLanguageSwitcher();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-[4px] cursor-pointer"
      aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <span className="text-[14px] text-WetGray">
        {isArabic ? 'English' : 'العربية'}
      </span>
      <Image src={isArabic ? '/images/flags/english.svg' : '/images/flags/arabic.svg'} alt={isArabic ? 'English' : 'Arabic'} width={24} height={24} />
    </button>
  );
}
