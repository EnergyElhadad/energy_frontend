import { Axios } from '@/core/lib/axios-server';
import { TransactionsResponse } from '../types/transaction';

export const getTransactions = async (): Promise<TransactionsResponse> => {
  try {
    const axios = await Axios();
    const { data } = await axios.get('/payments/transactions/');
    return data;
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return {
      message: 'Failed to fetch transactions',
      status: false,
      result: [],
    };
  }
};
