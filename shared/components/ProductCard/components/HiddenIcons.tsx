'use client';

import { EyeIcon } from '../../icons/Eye';
import { ShareIcon } from '../../icons/Share';
import { Button } from '../../ui/Button';
import { useShare } from '@/shared/hooks/useShare';
import { toSlug } from '@/shared/utils/slug';

interface HiddenIconsProps {
  title: string;
  id: string | number;
  onView?: () => void;
}

export const HiddenIcons = ({ title, id, onView }: HiddenIconsProps) => {
  const { handleShare } = useShare();

  return (
    <div
      className="absolute end-3 top-3 z-3 flex -translate-y-100 items-center justify-center gap-3 transition-all duration-300 ease-in-out group-hover:translate-y-0"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onView} aria-label="View product details" className="bg-primary/80 flex h-10.5 w-10.5 items-center justify-center rounded-full text-white">
        <EyeIcon />
      </button>

      <Button
        onClick={() =>
          handleShare({
            title,
            url: window.location.href + '/' + id + '-' + toSlug(title),
          })
        }
        aria-label="Share product"
        className="bg-primary/80 flex h-10.5 w-10.5 items-center justify-center rounded-full text-white"
      >
        <ShareIcon />
      </Button>
    </div>
  );
};
