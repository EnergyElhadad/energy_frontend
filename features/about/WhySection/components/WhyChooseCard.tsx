import React from "react";

type WhyChooseCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const WhyChooseCard = (props: WhyChooseCardProps) => {
  const { icon, title, description } = props;
  return (
    <div className="border-Stroke mx-auto flex w-full max-w-[384px] flex-1 items-center gap-3 rounded-md border bg-white p-6">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#6DD708]/10 text-[#6DD708]">
        {icon}
      </div>
      <div>
        <h4 className="mb-2 text-lg font-semibold text-black">{title}</h4>
        <p className="text-signalGray text-sm leading-6 font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};
