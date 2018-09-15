import { AccountModel } from './account.model';

export class SavingsAccount implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
  interestRate: number;
}