import { Link } from '@/core/i18n';
import React from 'react';
import { ArrowLeftIcon } from '@/shared/components/icons/ArrowLeft';

type Props = {
  title: string;
  textlink: string;
  urlLink: string;
};

export const HeaderSection: React.FC<Props> = ({ title, textlink, urlLink }) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-y-2 md:mb-11.75">
      <h2 className="text-WetGray text-xl font-bold lg:text-[32px] @max-2xl:text-2xl @max-sm:text-xl">{title}</h2>
      <Link
        href={urlLink}
        className="text-primary hover:bg-primary flex items-center justify-center gap-2 rounded-lg border bg-transparent px-3 py-2 text-sm transition-all hover:text-white md:text-base @max-2xl:py-1"
      >
        {textlink}
        <ArrowLeftIcon className="ltr:rotate-180" />
      </Link>
    </div>
  );
};
