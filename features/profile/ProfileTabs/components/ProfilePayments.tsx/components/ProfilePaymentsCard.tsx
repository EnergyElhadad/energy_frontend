import React from "react";

type ProfilePaymentsCardProps = {
  date?: string;
  masterCard?: string;
  orderNumber?: string;
};

export const ProfilePaymentsCard: React.FC<ProfilePaymentsCardProps> = ({
  date,
  masterCard,
  orderNumber,
}) => {
  return (
    <div className="border-Stroke xs:flex-row flex flex-col justify-between gap-y-3 rounded-md border px-6 py-4">
      <div className="flex flex-col gap-2">
        <p className="text-WetGray text-base font-normal">{date}</p>
        <p className="text-WetGray text-base font-bold">{masterCard}</p>
        <p className="text-WetGray text-base font-bold">
          Order number:{orderNumber}
        </p>
      </div>
      <p className="text-WetGray flex gap-1 text-base font-bold">
        <span>EGP</span>
        <span>665.98- </span>
      </p>
    </div>
  );
};
