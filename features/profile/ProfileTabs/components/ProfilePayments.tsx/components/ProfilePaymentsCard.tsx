import React from 'react';

type ProfilePaymentsCardProps = {
  date?: string;
  masterCard?: string;
  orderNumber?: string;
  amount?: string | null;
  currency?: string;
  status?: string;
};

export const ProfilePaymentsCard: React.FC<ProfilePaymentsCardProps> = ({ date, masterCard, orderNumber, amount, currency, status }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  return (
    <div className="border-Stroke xs:flex-row flex flex-col justify-between gap-y-3 rounded-md border px-6 py-4">
      <div className="flex flex-col gap-2">
        <p className="text-WetGray text-base font-normal">{formattedDate}</p>
        <p className="text-WetGray text-base font-bold">{masterCard}</p>
        <p className="text-WetGray text-base font-bold">Order number:{orderNumber}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-WetGray flex gap-1 text-base font-bold">
          <span>{currency || 'EGP'}</span>
          <span>{amount ? `${amount}- ` : ''}</span>
        </p>
        {status && (
          <span className={`text-sm font-medium ${status === 'SUCCESS' ? 'text-green-600' : status === 'PENDING' ? 'text-orange-500' : 'text-red-500'}`}>{status}</span>
        )}
      </div>
    </div>
  );
};
