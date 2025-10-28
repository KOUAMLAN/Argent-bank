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
  type: 'Electronic' | 'Card' | 'Transfer';
  category: 'Food' | 'Shopping' | 'Utilities' | 'Transport' | string;
  notes: string;
}
