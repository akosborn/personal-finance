import { Account } from './Account';

export class Loan implements Account {
  balance: number;
  description: string;
  id: number;
  name: string;
  minPayment: number;
  interestRate: number;
}
