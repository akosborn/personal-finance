import { BudgetItem } from './budget-item.model';
import { Expense } from './expense.model';

export class Budget {
  id: number;
  userId: number;
  items: BudgetItem[];

  constructor(id: number, userId: number, items: BudgetItem[]) {
    this.id = id;
    this.userId = userId;
    this.items = items;
  }
}
