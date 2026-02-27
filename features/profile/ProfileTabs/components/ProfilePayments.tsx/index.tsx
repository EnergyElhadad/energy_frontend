import React from 'react';
import { ProfileTilte } from '../ProfileTilte';
import { ProfilePaymentsCard } from './components/ProfilePaymentsCard';
import { getTransactions } from '@/features/payments/services/payments.server';

export const ProfilePayments = async () => {
  const transactionsRes = await getTransactions();
  const transactions = transactionsRes.result || [];

  return (
    <>
      <ProfileTilte title="المدفوعات" />

      <div className="flex flex-col gap-3">
        {transactions.map(payment => (
          <ProfilePaymentsCard
            key={payment.id}
            date={payment.created_at}
            masterCard={payment.payment_details}
            orderNumber={payment.order_number}
            amount={payment.amount}
            currency={payment.currency}
            // status={payment.status}
          />
        ))}
      </div>
    </>
  );
};
