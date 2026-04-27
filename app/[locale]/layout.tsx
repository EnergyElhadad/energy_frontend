import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/swiper.css';
import '@/styles/typography.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/core/i18n/i18n.config';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

const cairo = Cairo({
  variable: '--font-cairo-sans',
  subsets: ['arabic'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMessages({ locale });
  const messages = t as any;

  return {
    title: {
      default: messages?.Layout?.default_title || 'Energy Elhadad - Integrated Energy Solutions',
      template: messages?.Layout?.title_template || '%s | Energy Elhadad',
    },
    description: messages?.Layout?.description || "Energy Elhadad's official platform for providing the best energy solutions and outstanding services.",
  };
}

import { SessionProvider } from '@/core/providers/SessionProvider';
import QueryProvider from '@/core/providers/QueryProvider';
import { Toaster } from '@/shared/components/ui/sonner';
import { DirectionProvider } from '@/core/providers/direction-provider';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLang = locale === 'en' ? 'en' : 'ar';
  const messages = await getMessages();

  return (
    <html lang={currentLang} dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${cairo.variable} antialiased`}>
        <SessionProvider>
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              <DirectionProvider dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                {children}
                <Toaster position="top-center" swipeDirections={['right', 'left']} />
              </DirectionProvider>
            </NextIntlClientProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
