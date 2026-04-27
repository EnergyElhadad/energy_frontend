'use client';

// Per-segment error boundary. Anything thrown below the (site) layout — failed
// data fetches, render errors, etc. — surfaces here with the site chrome
// (header, footer) still intact, instead of falling through to Next's default
// blank error page. Must be a client component because it receives a `reset`
// callback from the framework.

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SiteError({ error, reset }: ErrorProps) {
  const t = useTranslations('Common');

  useEffect(() => {
    // Surface to whatever monitoring is wired up; for now console is fine —
    // Next ships the digest to server logs automatically.
    console.error('[SiteError]', error);
  }, [error]);

  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t('error_title')}</h1>
      <p className="text-muted-foreground mb-8 max-w-lg text-base md:text-lg">{t('error_description')}</p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => reset()} size="lg">
          {t('error_retry')}
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">{t('error_go_home')}</Link>
        </Button>
      </div>
    </div>
  );
}
