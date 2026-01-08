'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, type Locales } from '@/i18n';

export function useLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locales;

  const switchLanguage = (newLocale: Locales) => {
    if (newLocale === currentLocale) return;

    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    
    // Build the new path with the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
  };

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'ar' ? 'en' : 'ar';
    switchLanguage(newLocale);
  };

  return {
    currentLocale,
    availableLocales: locales,
    switchLanguage,
    toggleLanguage,
    isArabic: currentLocale === 'ar',
    isEnglish: currentLocale === 'en',
  };
}
