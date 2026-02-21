import { Skeleton } from '@/shared/components/ui/skeleton';

export const SectionHeaderSkeleton = () => (
  <div className="mb-11.75 flex items-center justify-between">
    <Skeleton className="h-8 w-48 rounded-lg" />
    <Skeleton className="h-10 w-24 rounded-lg" />
  </div>
);
