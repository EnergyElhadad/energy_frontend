import React from "react";

export const OrderCardDescItem = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <div>
      <h3 className="text-signalGray mb-1 text-sm font-normal">{title}</h3>
      <p className="text-WetGray mb-1 text-sm font-semibold">{desc}</p>
    </div>
  );
};
