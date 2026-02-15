import React from "react";

export const SummaryTitle = ({ title }: { title: string }) => {
  return (
    <h3 className="mb-4 text-base leading-relaxed font-bold text-black">
      {title}
    </h3>
  );
};
