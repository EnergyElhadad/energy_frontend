import React from "react";

export const OrderTotal = ({
  title,
  price,
}: {
  title: string;
  price: number;
}) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-1">
      <h4 className="text-gray400 text-base font-normal">{title}</h4>
      <p className="text-gray400 text-base font-normal">
        {price} {""}ج
      </p>
    </div>
  );
};
