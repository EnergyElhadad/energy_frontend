import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/swiper.css";
import "@/styles/typography.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "@/core/i18n/i18n.config";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const cairo = Cairo({
  variable: "--font-cairo-sans",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: {
    default: "اينيرجي الحداد - حلول الطاقة المتكاملة",
    template: "%s | اينيرجي الحداد",
  },
  description:
    "منصة اينيرجي الحداد الرسمية لتقديم أفضل حلول الطاقة والخدمات المتميزة في مجال الطاقة المتجددة والطاقة التقليدية. اكتشف منتجاتنا وخدماتنا الآن. ",
};

import { SessionProvider } from "@/core/providers/SessionProvider";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLang = locale === "en" ? "en" : "ar";
  const messages = await getMessages();

  return (
    <html lang={currentLang} dir={currentLang === "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo.variable} antialiased`}>
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
