import { Skeleton } from '@/shared/components/ui/skeleton';
import { ProductCardSkeleton } from '@/shared/components/skeletons/ProductCardSkeleton';

/* ─── Sidebar Filter Skeleton ─── */
const FilterSectionSkeleton = () => (
  <div className="border-b py-4">
    <Skeleton className="mb-3 h-5 w-20" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

const SidebarSkeleton = () => (
  <aside className="border-Stroke w-full space-y-1 rounded-sm border bg-white p-4">
    {/* Search */}
    <Skeleton className="h-10 w-full rounded-sm" />

    {/* Price filter */}
    <FilterSectionSkeleton />

    {/* Category filter */}
    <FilterSectionSkeleton />

    {/* Rating filter */}
    <FilterSectionSkeleton />

    {/* Reset button */}
    <Skeleton className="mt-4 h-10 w-full rounded-lg" />
  </aside>
);

/* ─── Products Header Skeleton ─── */
const ProductsHeaderSkeleton = () => (
  <div className="mb-8 flex items-center justify-between">
    <div className="space-y-2">
      <Skeleton className="h-7 w-32" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-10.5 w-28 rounded-sm" />
  </div>
);

/* ═══════════════════════════════════════════════
   Products Page Skeleton
   ═══════════════════════════════════════════════ */
export const ProductsPageSkeleton = () => {
  return (
    <main className="bg-Background">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 py-5">
          <Skeleton className="h-5 w-16 rounded-xl" />
          <span className="text-signalGray">/</span>
          <Skeleton className="h-5 w-24 rounded-xl" />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-33">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <SidebarSkeleton />
            </div>

            {/* Products */}
            <div className="md:col-span-3">
              <ProductsHeaderSkeleton />
              <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
