import { AccountModel } from './account.model';

export class Investment implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
}
