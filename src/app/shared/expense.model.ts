export class Expense {
  id: number;
  date: Date;
  description: string;
  amount: number;
  account: Account;

  constructor(date: Date, description: string, amount: number, account: Account) {
    this.date = date;
    this.description = description;
    this.amount = amount;
    this.account = account;
  }
}
