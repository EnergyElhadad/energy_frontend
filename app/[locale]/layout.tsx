import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const cairo = Cairo({
  variable: "--font-cairo-sans",
  subsets: ["arabic"],
});



export const metadata: Metadata = {
  title: {
    default: "اينيرجي الحداد - حلول الطاقة المتكاملة",
    template: "%s | اينيرجي الحداد",
  },
  description: "منصة اينيرجي الحداد الرسمية لتقديم أفضل حلول الطاقة والخدمات المتميزة في مجال الطاقة المتجددة والطاقة التقليدية. اكتشف منتجاتنا وخدماتنا الآن. ",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const currentLang = locale === 'en' ? 'en' : 'ar';
  const messages = await getMessages();

  return (
    <html lang={currentLang} dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${cairo.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
