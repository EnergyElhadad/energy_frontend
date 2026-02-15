import React from 'react';

export const Descriptions = ({ description }: { description: string }) => {
  return (
    <div className="mb-6">
      <p className="text-WetGray text-sm leading-relaxed font-normal">{description}</p>
    </div>
  );
};
