'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackMetaPixel } from './metaPixelEvents';

// Intentionally the raw next/navigation hooks, NOT the @/core/i18n wrappers:
// the next-intl usePathname strips the /ar | /en prefix, which would make
// locale switches on the same page invisible to tracking.

// Query params that represent navigation to different content. Changes to
// anything else (page, sort, filters, utm_*) do NOT count as a PageView —
// agreed with marketing to avoid inflating counts with pagination/sorting.
const NAVIGATION_PARAMS = ['categoryId', 'search'];

const PageViewTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navQuery = NAVIGATION_PARAMS.filter(p => searchParams.has(p))
    .map(p => `${p}=${searchParams.get(p)}`)
    .join('&');
  const url = navQuery ? `${pathname}?${navQuery}` : pathname;

  // null = initial page load (base snippet in <head> already fired PageView).
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (lastTracked.current === null) {
      // Skip the first run: avoids double-counting the initial PageView.
      lastTracked.current = url;
      return;
    }
    if (lastTracked.current === url) {
      // Same navigation key (non-nav param change, or Strict Mode
      // double-invocation in dev) — do not re-fire.
      return;
    }
    lastTracked.current = url;
    // Note: if only fbevents.js is blocked, fbq still exists as the
    // bootstrap's queueing stub and calls queue harmlessly.
    trackMetaPixel('PageView');
  }, [url]);

  return null;
};

/**
 * Fires fbq('track','PageView') on client-side navigations whose pathname or
 * meaningful navigation params (see NAVIGATION_PARAMS) change — e.g. category
 * browsing at /products?categoryId=N. Pagination/sort/filter-only changes are
 * intentionally not counted.
 *
 * useSearchParams() must live under a Suspense boundary (Next.js rule) —
 * self-wrapped here so the root layout stays clean.
 */
export const MetaPixelPageView = () => (
  <Suspense fallback={null}>
    <PageViewTracker />
  </Suspense>
);
