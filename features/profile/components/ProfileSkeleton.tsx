import { Skeleton } from '@/shared/components/ui/skeleton';

export const ProfileSkeleton = () => {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex flex-col gap-2 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
        ))}
      </div>
    </div>
  );
};
