// Import global styles and fonts
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import Image from 'next/image';

const cairo = Cairo({
  variable: '--font-cairo-sans',
  subsets: ['arabic'],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page Not Found | Energy Elhadad',
    description: 'Page not found',
  };
}

export default async function GlobalNotFound() {
  return (
    <html lang="en" className={cairo.className}>
      <body className="min-h-screen bg-linear-to-br from-slate-50 via-white to-teal-50">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
          <div className="relative w-full max-w-2xl space-y-8 text-center">
            {/* 404 Illustration */}
            <div className="relative mx-auto w-full max-w-md">
              <Image src="/images/404.png" alt="404 Not Found" width={500} height={500} priority />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="bg-linear-to-r from-teal-600 to-emerald-600 bg-clip-text text-5xl leading-20 font-bold text-transparent md:text-6xl">Page Not Found</h1>
              <p className="mx-auto max-w-lg text-lg text-slate-600 md:text-xl">The page you are looking for does not exist.</p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full bg-teal-200 opacity-20 blur-xl" />
            <div className="absolute right-10 bottom-10 h-32 w-32 animate-pulse rounded-full bg-emerald-200 opacity-20 blur-xl" style={{ animationDelay: '1000ms' }} />
          </div>
        </div>
      </body>
    </html>
  );
}
