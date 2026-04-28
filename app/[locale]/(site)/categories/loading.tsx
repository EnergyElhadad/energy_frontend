import { Skeleton } from '@/shared/components/ui/skeleton';

// Mirrors the layout of CategoriesPage so the page doesn't visibly jump when
// data resolves. 12 placeholder cards cover the typical above-the-fold grid
// across mobile (2 col) up through desktop (6 col).
export default function CategoriesLoading() {
  return (
    <main className="bg-Background min-h-screen">
      <div className="container">
        <div className="py-5">
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-33">
          <Skeleton className="mb-8 h-8 w-56" />
          <div className="grid grid-cols-2 gap-4 min-[1250px]:grid-cols-5 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const CategoryCardSkeleton = () => (
  <div className="border-Stroke mx-auto h-full max-w-43.5 rounded-2xl border bg-white px-2 py-4 text-center md:px-5 md:py-6">
    <Skeleton className="mx-auto mb-2 h-20 w-20 rounded-full md:h-33.75 md:w-33.75" />
    <Skeleton className="mx-auto h-4 w-20 md:h-5 md:w-28" />
  </div>
);
