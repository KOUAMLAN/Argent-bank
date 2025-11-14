export interface Account {
  id: string;
  title: string;
  amount: string;
  description: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: 'Electronic' | 'Card' | 'Transfer' | 'Deposit';
  category: string;
  notes: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
}
