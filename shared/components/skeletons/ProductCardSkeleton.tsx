import { Skeleton } from '@/shared/components/ui/skeleton';

export const ProductCardSkeleton = () => (
  <div className="border-Stroke/50 flex w-full flex-col rounded-sm border bg-white p-2 pb-3">
    <Skeleton className="min-h-63.75 w-full rounded-xl" />
    <div className="flex flex-col gap-2 px-1 pt-3">
      <div className="flex flex-col gap-1.5">
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
