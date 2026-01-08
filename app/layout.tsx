import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} antialiased`}
      >
        <main  className="min-h-screen flex items-center justify-center bg-Background @container container ">      
        {children}
        </main>
      </body>
    </html>
  );
}
