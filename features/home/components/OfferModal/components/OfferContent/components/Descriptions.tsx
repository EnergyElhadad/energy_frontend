import React from 'react';

export const Descriptions = ({ description }: { description: string }) => {
  return (
    <div className="mb-6">
      <div className="text-WetGray text-sm leading-relaxed font-normal" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};
