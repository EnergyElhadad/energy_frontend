import React from 'react';

export const AboutSectionDesc = ({ title, text }: { title: string; text: string }) => {
  return (
    <div>
      <h2 className="text-WetGray mb-3 text-center text-2xl font-bold md:mb-5 md:text-start md:text-[32px]">{title}</h2>

      <p className="text-WetGray mb-4 text-center text-base leading-7 font-normal md:text-start">{text}</p>
    </div>
  );
};
