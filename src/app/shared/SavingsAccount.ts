import { AccountModel } from './account.model';
import { Expense } from './expense.model';

export class SavingsAccount implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
  interestRate: number;
  expenses: Expense[];
  type = 'SAVINGS';

  constructor(init?: Partial<SavingsAccount>) {
    Object.assign(this, init);
  }
}
