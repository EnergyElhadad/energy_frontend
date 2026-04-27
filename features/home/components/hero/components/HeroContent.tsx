import Image from 'next/image';

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
   * True only for the first slide. The first slide is the LCP image — it gets
   * `priority` (which already implies `fetchPriority="high"` and eager loading
   * in next/image). Marking every slide as priority defeats the optimization
   * and stalls the network on slides 2..N that aren't visible.
   */
  priority?: boolean;
};

// 100vw across all breakpoints — the hero image fills the viewport width.
const HERO_SIZES = '100vw';

export const HeroContent = ({ title, imageUrl, mobileImageUrl, description, linkUrl, linkText, priority = false }: HeroContentProps) => {
  const hasText = Boolean(title?.trim() || description?.trim() || linkText?.trim());

  return (
    <div className="relative h-full w-full">
      {mobileImageUrl ? (
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileImageUrl} />
          <source media="(min-width: 768px)" srcSet={imageUrl} />
          <Image src={imageUrl} alt="Hero Banner" fill priority={priority} sizes={HERO_SIZES} className="object-cover" />
        </picture>
      ) : (
        <Image src={imageUrl} alt="Hero Banner" fill priority={priority} sizes={HERO_SIZES} className="object-cover" />
      )}
      <OverlayHero show={hasText} />
      {hasText && <HeroDescription title={title} desc={description} linkUrl={linkUrl} linkText={linkText} />}
    </div>
  );
};
