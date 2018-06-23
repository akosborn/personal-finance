import { AccountModel } from './account.model';

export class CheckingAccountModel implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
}
