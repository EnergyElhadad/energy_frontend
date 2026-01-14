import React from "react";
import { AvailableQuantitiIcon } from "@/shared/components/icons/AvailableQuantities";

export const AvailableQuantities = () => {
  return (
    <div className="mb-4 flex space-x-2 text-sm">
      <div className="text-primary">
        <AvailableQuantitiIcon />
      </div>
      <p className="font-semibold text-black">
        المتبقي <span className="text-primary">16</span> وحده
      </p>
    </div>
  );
};
