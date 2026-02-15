import { Skeleton } from "@/shared/components/ui/skeleton";

const ProductCardSkeleton = () => (
  <div className="border-Stroke flex flex-col gap-3 rounded-2xl border p-3">
    <Skeleton className="h-[255px] w-full rounded-xl" />
    <div className="flex flex-col gap-2 px-1">
      <div className="flex flex-col gap-1.5 align-middle">
        <Skeleton className="mx-auto h-4 w-full" />
        <Skeleton className="mx-auto h-4 w-3/4" />
      </div>
      <Skeleton className="mx-auto mt-2 h-3 w-1/3" />
      <div className="mt-3 flex items-center justify-center gap-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16 opacity-50" />
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
      </div>
    </div>
  </div>
);

export const PageSkeletonLoader = () => {
  return (
    <main className="bg-Background pb-20">
      <div className="container pt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-xl" />
          <span className="text-signalGray">/</span>
          <Skeleton className="h-6 w-20 rounded-xl" />
          <span className="text-signalGray">/</span>
          <Skeleton className="h-6 w-20 rounded-xl" />
        </div>

        <div className="my-10 flex gap-6">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-[105px] w-[119px] rounded-lg" />
              ))}
            </div>
            <div className="flex-1">
              <Skeleton className="h-[444px] w-[455px] rounded-xl" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-6 w-[129px]" />
            </div>
            <div className="flex gap-8">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/3" />
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <Skeleton className="h-8 w-[80px]" />
              <Skeleton className="h-15 w-[180px] rounded-xl" />
            </div>
            <div className="mt-5 flex items-center gap-4">
              <Skeleton className="h-12 w-1/2 rounded-xl" />
              <Skeleton className="h-12 w-1/2 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <Skeleton className="h-10 w-[226px] rounded-xl" />
          <Skeleton className="h-10 w-[226px] rounded-xl" />
          <Skeleton className="h-10 w-[226px] rounded-xl" />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-50" />
          <Skeleton className="h-10 w-30 rounded-xl" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
};
