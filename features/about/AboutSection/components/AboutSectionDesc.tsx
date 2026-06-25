import React from 'react';

export const AboutSectionDesc = ({ title, text }: { title: string; text: string }) => {
  // The text may hold several paragraphs separated by newlines — render each
  // as its own <p> so the spacing is preserved.
  const paragraphs = text
    .split('\n')
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

  return (
    <div>
      <h2 className="text-WetGray mb-3 text-center text-2xl font-bold md:mb-5 md:text-start md:text-[32px]">{title}</h2>

      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-WetGray mb-4 text-center text-base leading-7 font-normal md:text-start">
          {paragraph}
        </p>
      ))}
    </div>
  );
};
