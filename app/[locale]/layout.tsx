import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/swiper.css';
import '@/styles/typography.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/core/i18n/i18n.config';
import { setRequestLocale } from 'next-intl/server';
import { SessionProvider } from '@/core/providers/SessionProvider';
import QueryProvider from '@/core/providers/QueryProvider';
import { Toaster } from '@/shared/components/ui/sonner';
import { DirectionProvider } from '@/core/providers/direction-provider';
import { SITE_URL } from '@/shared/utils/site-url';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

const cairo = Cairo({
  variable: '--font-cairo-sans',
  subsets: ['arabic'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const defaultTitle = messages?.Layout?.default_title || 'Energy Elhadad - Integrated Energy Solutions';
  const description = messages?.Layout?.description || "Energy Elhadad's official platform for providing the best energy solutions and outstanding services.";

  // Search Console / Bing / Yandex verification tokens are environment-driven so
  // the domain can be re-verified without a code change. Set these in hosting env:
  //   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
  //   NEXT_PUBLIC_BING_SITE_VERIFICATION=...
  //   NEXT_PUBLIC_YANDEX_SITE_VERIFICATION=...
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  const yandexVerification = process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION;
  const verification =
    googleVerification || bingVerification || yandexVerification
      ? {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(yandexVerification ? { yandex: yandexVerification } : {}),
          ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}),
        }
      : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: defaultTitle,
      template: messages?.Layout?.title_template || '%s | Energy Elhadad',
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map(l => [l, `/${l}`])),
    },
    openGraph: {
      title: defaultTitle,
      description,
      url: `/${locale}`,
      siteName: 'Energy Elhadad',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    ...(verification ? { verification } : {}),
  };
}

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

  // Open the TCP/TLS connection to the API origin while the HTML is still
  // streaming. By the time the first product/banner image starts downloading,
  // the handshake (DNS + TCP + TLS, ~100–300ms on a cold connection) is already
  // done. The image itself is also loaded from this origin so this benefits
  // both the API JSON fetches and every <Image src=...> below.
  let apiOrigin: string | undefined;
  try {
    if (process.env.NEXT_PUBLIC_API_URL) {
      apiOrigin = new URL(process.env.NEXT_PUBLIC_API_URL).origin;
    }
  } catch {
    // Malformed env var — skip the hint rather than throw.
  }

  return (
    <html lang={currentLang} dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {apiOrigin && (
          <>
            <link rel="preconnect" href={apiOrigin} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={apiOrigin} />
          </>
        )}
      </head>
      <body className={`${cairo.variable} antialiased`}>
        <SessionProvider>
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              <DirectionProvider dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                {children}
                <Toaster position="top-center" swipeDirections={['right', 'left', 'top']} />
              </DirectionProvider>
            </NextIntlClientProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
