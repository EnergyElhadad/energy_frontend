export interface Transaction {
  id: number;
  amount: string | null;
  created_at: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED'; // Added FAILED as a likely status
  order_number: string;
  currency: string;
  payment_details: string;
}

export interface TransactionsResponse {
  message: string;
  status: boolean;
  result: Transaction[];
}
