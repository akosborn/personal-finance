import { AccountModel } from './account.model';
import { Expense } from './expense.model';

export class Investment implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
  expenses: Expense[];
  type: string;
}
