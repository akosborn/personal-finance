import { AccountModel } from './account.model';

export class CheckingAccount implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
}
