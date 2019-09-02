import { AccountModel } from './account.model';
import { Expense } from './expense.model';
import { CheckingAccount } from './checking-account.model';

export class CreditCard implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
  limitAmt: number;
  minPayment: number;
  interestRate: number;
  expenses: Expense[];
  type = 'CREDIT_CARD';
  dueDay: number;

  constructor(init?: Partial<AccountModel>) {
    Object.assign(this, init);
  }
}
