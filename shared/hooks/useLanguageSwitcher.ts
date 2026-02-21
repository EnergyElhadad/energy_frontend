'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, type Locales } from '@/core/i18n';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';

export function useLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locales;
  const { data: session } = useSession();

  const switchLanguage = (newLocale: Locales) => {
    if (newLocale === currentLocale) return;

    if (session?.user) {
      const accessToken = (session.user as User).accessToken;
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/language/update/`;

      fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `token ${accessToken}` } : {}),
        },
        body: JSON.stringify({ language: newLocale }),
        keepalive: true,
      }).catch(() => {});
    }

    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.replace(newPath);
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
