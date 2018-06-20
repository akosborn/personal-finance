import { Account } from './Account';

export class CreditCard implements Account {
  balance: number;
  description: string;
  id: number;
  name: string;
  limit: number;
  minPayment: number;
  interestRate: number;
}
