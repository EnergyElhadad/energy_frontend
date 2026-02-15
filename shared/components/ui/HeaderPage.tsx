import React from 'react';

export const HeaderPage = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <h1 className="text-primary py-4 text-base font-normal">
      الرئيسية / <span className="text-signalGray"> {pageTitle}</span>
    </h1>
  );
};
