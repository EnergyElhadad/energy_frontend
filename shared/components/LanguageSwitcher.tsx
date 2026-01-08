'use client';

import { useLanguageSwitcher } from '@/shared/hooks/useLanguageSwitcher';

export function LanguageSwitcher() {
  const { toggleLanguage, isArabic } = useLanguageSwitcher();

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
      aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      {isArabic ? 'EN' : 'عربي'}
    </button>
  );
}
