import { Skeleton } from '@/shared/components/ui/skeleton';
import { SectionHeaderSkeleton } from '@/shared/components/skeletons/SectionHeaderSkeleton';
import { ProductCardSkeleton } from '@/shared/components/skeletons/ProductCardSkeleton';

/* ─── Category Card Skeleton ─── */
const CategoryCardSkeleton = () => (
  <div className="border-Stroke mx-auto max-w-43.5 rounded-2xl border bg-white px-5 py-6 text-center">
    <Skeleton className="mx-auto mb-2 h-33.75 w-33.75 rounded-full" />
    <Skeleton className="mx-auto h-5 w-20" />
  </div>
);

/* ─── Banner Card Skeleton ─── */
const BannerCardSkeleton = () => (
  <div className="w-full max-w-147 overflow-hidden rounded-sm">
    <Skeleton className="min-h-57.25 w-full" />
  </div>
);

/* ─── Why Choose Us Card Skeleton ─── */
const WhyChooseUsCardSkeleton = () => (
  <div className="border-Stroke/7 flex items-center gap-3 rounded-lg border bg-white p-6">
    <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  </div>
);

/* ─── Review Card Skeleton ─── */
const ReviewCardSkeleton = () => (
  <div className="border-Stroke mx-auto flex max-w-[384px] gap-4 rounded-lg border bg-white p-6">
    <Skeleton className="h-12.5 w-12.5 shrink-0 rounded-full" />
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   Home Page Skeleton
   ═══════════════════════════════════════════════ */
export const HomePageSkeleton = () => {
  return (
    <main className="space-y-8">
      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden">
        <Skeleton className="h-105 w-full" />
      </section>

      {/* ── Shop By Category ── */}
      <section className="container py-16">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* ── Products Section ── */}
      <section className="bg-Background py-16">
        <div className="container">
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Banners ── */}
      <section className="bg-Background py-10">
        <div className="container">
          <div className="grid grid-cols-1 place-items-center gap-6 lg:grid-cols-2">
            <BannerCardSkeleton />
            <BannerCardSkeleton />
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-Background py-10">
        <div className="container">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map(i => (
                <WhyChooseUsCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ── */}
      <section className="w-full overflow-hidden bg-white pt-18 pb-14">
        <div className="container">
          <div className="mb-8 flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map(i => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Banner ── */}
      <section className="bg-Background py-12.5">
        <div className="container">
          <Skeleton className="min-h-81.25 w-full rounded-lg" />
        </div>
      </section>
    </main>
  );
};
