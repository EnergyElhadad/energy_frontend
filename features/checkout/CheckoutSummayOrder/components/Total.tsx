import React from "react";

export const Total = ({ title, price, currency = "ج" }: { title: string; price: number; currency?: string }) => {
  return (
    <div className="mb-3 flex items-center justify-between gap-1 md:mb-6">
      <h5 className="text-WetGray text-base font-bold">{title}</h5>
      <p className="text-WetGray text-base font-bold">
        {" "}
        {price} {currency}
      </p>
    </div>
  );
};
