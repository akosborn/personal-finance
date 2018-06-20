import { Account } from './Account';

export class CheckingAccount implements Account {
  balance: number;
  description: string;
  id: number;
  name: string;
}
