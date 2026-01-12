import Link from "next/link";
import React from "react";
import { ArrowLeftIcon } from "@/shared/components/icons/ArrowLeft";

type Props = {
  title: string;
  textlink: string;
  urlLink: string;
};

export const HeaderSection: React.FC<Props> = ({
  title,
  textlink,
  urlLink,
}) => {
  return (
    <div className="mb-11.75 flex flex-wrap items-center justify-between gap-y-2">
      <h2 className="text-WetGray text-[32px] font-bold @max-2xl:text-2xl @max-sm:text-xl">
        {title}
      </h2>
      <Link
        href={urlLink}
        className="text-primary hover:bg-primary flex items-center justify-center gap-2 rounded-lg border bg-transparent px-3 py-2 transition-all hover:text-white @max-2xl:py-1"
      >
        {textlink}
        <ArrowLeftIcon className="ltr:rotate-180" />
      </Link>
    </div>
  );
};
