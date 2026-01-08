export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'ar';

export type Locales = (typeof locales)[number];
