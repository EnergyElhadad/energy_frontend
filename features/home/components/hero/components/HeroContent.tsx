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
};

export const HeroContent = ({ title, imageUrl, mobileImageUrl, description, linkUrl, linkText }: HeroContentProps) => {
  const hasText = Boolean(title?.trim() || description?.trim() || linkText?.trim());

  return (
    <div className="relative h-full w-full">
      {mobileImageUrl ? (
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileImageUrl} />
          <source media="(min-width: 768px)" srcSet={imageUrl} />
          <Image src={imageUrl} alt="Hero Banner" fill priority loading="eager" className="object-cover" />
        </picture>
      ) : (
        <Image src={imageUrl} alt="Hero Banner" fill priority loading="eager" className="object-cover" />
      )}
      <OverlayHero show={hasText} />
      {hasText && <HeroDescription title={title} desc={description} linkUrl={linkUrl} linkText={linkText} />}
    </div>
  );
};
