import { AccountModel } from './account.model';

export class Expense {
  id: number;
  date: Date;
  description: string;
  amount: number;
  account: AccountModel;
  category;

  constructor(init?: Partial<Expense>) {
    Object.assign(this, init);
  }

  // constructor(date: Date, description: string, amount: number, account: AccountModel) {
  //   this.date = date;
  //   this.description = description;
  //   this.amount = amount;
  //   this.account = account;
  // }
}
