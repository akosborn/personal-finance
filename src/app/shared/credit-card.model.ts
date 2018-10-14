import { AccountModel } from './account.model';
import { Expense } from './expense.model';

export class CreditCard implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
  limitAmt: number;
  minPayment: number;
  interestRate: number;
  expenses: Expense[];
  type: string;
}
