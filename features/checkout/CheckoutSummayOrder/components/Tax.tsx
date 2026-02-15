import React from "react";

export const Tax = ({ title }: { title: string }) => {
  return (
    <p className="text-signalGray text-sm font-medium">
      {title} <span className="text-danger">*</span>
    </p>
  );
};
