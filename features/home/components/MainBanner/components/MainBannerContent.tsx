import Link from 'next/link';
import React from 'react';

type MainBannerContentProps = {
  title: string;
  desc1: string;
  desc2: string;
  linkUrl: string;
};

export const MainBannerContent: React.FC<MainBannerContentProps> = ({ title, desc1, desc2, linkUrl }) => {
  return (
    <div className="absolute top-1/2 left-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 space-y-2 px-4 py-2 text-center">
      <h4 className="text-primary mb-6 text-sm font-normal md:text-[1rem]">{title}</h4>
      <p className="mb-4 text-2xl font-bold text-white md:text-[32px]">{desc1}</p>
      <p className="mb-10 text-sm font-normal text-white md:text-base">{desc2} </p>
      <Link href={linkUrl} className="bg-primary hover:bg-primary/80 rounded-lg px-6 py-2 text-[16px] text-white transition-colors max-xl:px-4 max-xl:text-xs">
        اكتشف العروض
      </Link>
    </div>
  );
};
