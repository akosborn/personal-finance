import { Account } from './Account';

export class Investment implements Account {
  balance: number;
  description: string;
  id: number;
  name: string;
}
