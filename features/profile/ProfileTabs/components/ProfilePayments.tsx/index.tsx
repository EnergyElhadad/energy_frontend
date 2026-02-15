import React from "react";
import { ProfileTilte } from "../ProfileTilte";
import { ProfilePaymentsCard } from "./components/ProfilePaymentsCard";

const paymentsData = [
  {
    id: 1,
    date: "Septemper 1, 2025",
    masterCard: "Mastercard ****1234",
    orderNumber: "17156789",
  },
  {
    id: 2,
    date: "Septemper 1, 2025",
    masterCard: "Mastercard ****1234",
    orderNumber: "17156789",
  },
];

export const ProfilePayments = () => {
  return (
    <>
      <ProfileTilte title="المدفوعات" />

      <div className="flex flex-col gap-3">
        {paymentsData.map((payment) => (
          <ProfilePaymentsCard
            key={payment.id}
            date={payment.date}
            masterCard={payment.masterCard}
            orderNumber={payment.orderNumber}
          />
        ))}
      </div>
    </>
  );
};
