import { Account } from './Account';

export class SavingsAccount implements Account {
  balance: number;
  description: string;
  id: number;
  name: string;
  interestRate: number;
}
