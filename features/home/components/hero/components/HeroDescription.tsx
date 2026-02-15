import Link from 'next/link';
import React from 'react';

type HeroDescriptionProps = {
  title: string;
  desc?: string;
  linkUrl: string;
  linkText: string;
};

export const HeroDescription: React.FC<HeroDescriptionProps> = ({ title, desc, linkUrl, linkText }) => {
  return (
    <div className="relative z-10 container flex h-full items-center justify-start px-24 max-lg:px-10 max-sm:px-6">
      <div className="max-w-full text-start text-white">
        <h1 className="mb-4 text-[2.5rem] font-bold max-xl:text-2xl max-sm:text-[1rem]">{title}</h1>

        <p className="mb-6 text-[1.25rem] font-semibold text-white max-xl:text-base max-sm:text-[0.75rem]"> {desc}</p>

        <Link href={linkUrl} className="bg-primary hover:bg-primary/80 rounded-lg px-6 py-2 text-[16px] text-white transition-colors max-xl:px-4 max-xl:text-xs">
          {linkText}
        </Link>
      </div>
    </div>
  );
};
