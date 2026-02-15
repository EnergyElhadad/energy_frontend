import Image from 'next/image';

import { OverlayHero } from './OverlayHero';
import { HeroDescription } from './HeroDescription';

type HeroContentProps = {
  title: string;
  imageUrl: string;
  description?: string;
  linkUrl: string;
  linkText: string;
};

export const HeroContent = ({ title, imageUrl, description, linkUrl, linkText }: HeroContentProps) => {
  return (
    <div className="relative h-full w-full">
      <Image src={imageUrl} alt="Hero Banner" fill priority loading="eager" />
      <OverlayHero />
      <HeroDescription title={title} desc={description} linkUrl={linkUrl} linkText={linkText} />
    </div>
  );
};
