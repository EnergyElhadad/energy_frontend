import { ArtDirectedImage } from '@/shared/components/ui/ArtDirectedImage';

import { OverlayHero } from './OverlayHero';
import { HeroDescription } from './HeroDescription';

type HeroContentProps = {
  title: string;
  imageUrl: string;
  mobileImageUrl?: string;
  description?: string;
  linkUrl: string;
  linkText: string;
  /**
   * True only for the first slide. The first slide is the LCP image — it is
   * preloaded with `fetchPriority="high"` and loaded eagerly. Marking every
   * slide as priority defeats the optimization and stalls the network on
   * slides 2..N that aren't visible.
   */
  priority?: boolean;
};

// 100vw across all breakpoints — the hero image fills the viewport width.
const HERO_SIZES = '100vw';

export const HeroContent = ({ title, imageUrl, mobileImageUrl, description, linkUrl, linkText, priority = false }: HeroContentProps) => {
  const hasText = Boolean(title?.trim() || description?.trim() || linkText?.trim());

  return (
    <div className="relative h-full w-full">
      <ArtDirectedImage src={imageUrl} mobileSrc={mobileImageUrl} alt="Hero Banner" sizes={HERO_SIZES} priority={priority} className="object-cover" />
      {/* Overlay + text are desktop-only. On mobile the banner shows as a clean
          image (the artwork already carries its own text/CTA). */}
      {hasText && (
        <div className="hidden lg:block">
          <OverlayHero show={hasText} />
          <HeroDescription title={title} desc={description} linkUrl={linkUrl} linkText={linkText} />
        </div>
      )}
    </div>
  );
};
