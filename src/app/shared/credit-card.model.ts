import { AccountModel } from './account.model';

export class CreditCard implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
  limit: number;
  minPayment: number;
  interestRate: number;
}
