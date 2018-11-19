import { Component, OnInit } from '@angular/core';
import { Expense } from '../shared/expense.model';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  grossIncome = 44500;
  tax = 8588;
  netIncome = this.grossIncome - this.tax;
  monthlyNetIncome = this.netIncome / 12;

  expenses: Expense[] = [];
  budgetItems = [];

  // Pie
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'doughnut';

  constructor() {
    this.expenses.push(new Expense({category: 'DEBT', description: 'Citi', amount: 25}));
    this.expenses.push(new Expense({category: 'DEBT', description: 'Chase', amount: 228}));
    this.expenses.push(new Expense({category: 'DEBT', description: 'Discover Personal', amount: 183}));
    this.expenses.push(new Expense({category: 'DEBT', description: 'Discover Student', amount: 50}));
    this.expenses.push(new Expense({category: 'DEBT', description: 'Great Lakes Student', amount: 233}));
    this.budgetItems.push(
      {
        category: 'DEBT',
        fraction: 0.26
      });
    this.budgetItems.push(
      {
        category: 'GROCERIES',
        fraction: 0.0458
      });
    this.budgetItems.push(
      {
        category: 'EATING OUT',
        fraction: 0.0458
      });
    this.budgetItems.forEach(
      item => {
        this.pieChartLabels.push(item.category);
        this.pieChartData.push(item.fraction * 100);
      }
    );
  }

  ngOnInit() {
  }

}
