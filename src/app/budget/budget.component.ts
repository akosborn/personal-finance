import { Component, OnInit } from '@angular/core';
import { Expense } from '../shared/expense.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  recurringExpFormGroup: FormGroup;
  categories = [
    'Debt Repayment',
    'Food and Drinks',
    'Groceries',
    'Transportation',
    'Rent',
    'Internet',
    'Utilities'
  ];

  // Pie
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'doughnut';

  constructor() {
    this.expenses.push(new Expense({category: 'Debt Repayment', description: 'Citi', amount: 25}));
    this.expenses.push(new Expense({category: 'Debt Repayment', description: 'Discover Personal', amount: 183}));
    this.expenses.push(new Expense({category: 'Debt Repayment', description: 'Discover Student', amount: 50}));
    this.expenses.push(new Expense({category: 'Debt Repayment', description: 'Great Lakes Student', amount: 233}));
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
    this.recurringExpFormGroup = new FormGroup({
      category: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.maxLength(100)]),
      amount: new FormControl(null, Validators.required)
    });
  }

  onAddRecurringExpense() {
    const expense: Expense = new Expense(this.recurringExpFormGroup.value);
    this.expenses.push(expense);
    this.expenses = [...this.expenses]; // TODO: Consider making sum pipe impure instead of triggering it via deep copy
    this.recurringExpFormGroup.reset();
  }
}
