import { Expense } from './expense.model';

export interface AccountModel {
  id: number;
  name: string;
  description: string;
  balance: number;
  type: string;
  expenses: Expense[];
}
