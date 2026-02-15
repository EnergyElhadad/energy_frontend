import React from "react";

export const AboutSectionDesc = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <div>
      <h2 className="text-WetGray mb-3 text-2xl font-bold md:mb-5 md:text-[32px]">
        {title}
      </h2>

      <p className="text-WetGray mb-4 text-base leading-7 font-normal">
        {text}
      </p>
    </div>
  );
};
