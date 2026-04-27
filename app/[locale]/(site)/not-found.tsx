import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/shared/components/ui/Button';

// In-segment 404. Triggered by `notFound()` calls inside (site) routes — keeps
// the header/footer chrome (the global app/global-not-found.tsx is only used
// when a segment doesn't supply its own and serves a chromeless page).
export default async function SiteNotFound() {
  const t = await getTranslations('Common');

  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-primary mb-2 text-6xl font-extrabold tracking-tight md:text-7xl">404</p>
      <h1 className="mb-4 text-2xl font-bold md:text-3xl">{t('not_found_title')}</h1>
      <p className="text-muted-foreground mb-8 max-w-lg text-base md:text-lg">{t('not_found_description')}</p>

      <Button asChild size="lg">
        <Link href="/">{t('not_found_go_home')}</Link>
      </Button>
    </div>
  );
}
