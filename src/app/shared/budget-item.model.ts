import { Expense } from './expense.model';

export class BudgetItem {
  id: number;
  budgetId: number;
  description: string;
  category: string; // ToDo: Re-evaluate later. May need to create a Category model
  fraction: number;
  amount: number;

  constructor(init?: Partial<Expense>) {
    Object.assign(this, init);
  }
}
