import React, { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  content: string;
};

export const CardWhyChooseUs: React.FC<Props> = ({ icon, title, content }) => {
  return (
    <div className="border-Stroke/7 flex items-center gap-3 rounded-lg border bg-white p-6">
      <div className="text-primary bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
        {icon}
      </div>

      <div className="">
        <h3 className="mb-2 text-lg font-semibold text-black">{title}</h3>

        <p className="text-SingalGray text-sm leading-relaxed font-normal">
          {content}
        </p>
      </div>
    </div>
  );
};
