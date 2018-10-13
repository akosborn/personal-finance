export class Expense {
  id: number;
  date: Date;
  description: string;
  amount: number;
  accountId: number;

  constructor(date: Date, description: string, amount: number, accountId: number) {
    this.date = date;
    this.description = description;
    this.amount = amount;
    this.accountId = accountId;
  }
}
