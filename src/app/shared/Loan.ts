import { AccountModel } from './account.model';

export class Loan implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
  minPayment: number;
  interestRate: number;
}
