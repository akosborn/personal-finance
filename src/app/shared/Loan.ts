import { AccountModel } from './account.model';
import { Expense } from './expense.model';

export class Loan implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
  minPayment: number;
  interestRate: number;
  expenses: Expense[];
  type = 'LOAN';
  dueDay: number;

  constructor(init?: Partial<Loan>) {
    Object.assign(this, init);
  }
}
