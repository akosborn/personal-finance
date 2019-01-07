import { Component, OnInit } from '@angular/core';
import { Expense } from '../shared/expense.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../shared/budget.service';
import { BudgetItem } from '../shared/budget-item.model';
import { WalletService } from '../shared/wallet.service';
import { Wallet } from '../shared/wallet.model';
import { Subscription } from 'rxjs';
import { Budget } from '../shared/budget.model';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  wallet: Wallet;
  walletSubscription: Subscription;

  grossIncome = 47500;
  retirement = this.grossIncome * 0.04;
  tax = 10115;
  netIncome = this.grossIncome - this.retirement - this.tax;
  monthlyNetIncome = this.netIncome / 12;

  expenses: Expense[] = [];
  budget: Budget;
  budgetItems = [];

  recurringExpFormGroup: FormGroup;
  budgetItemFormGroup: FormGroup;
  categories = [
    'Debt Repayment',
    'Emergency Fund',
    'Food and Drinks',
    'Groceries',
    'Internet',
    'Investing',
    'Rent',
    'Savings',
    'Transportation',
    'Utilities',
    'Wants'
  ];

  // Pie
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'doughnut';

  constructor(private budgetService: BudgetService, private walletService: WalletService) {
    // this.expenses.push(new Expense({category: 'Debt Repayment', description: 'Citi', amount: 25}));
    // this.expenses.push(new Expense({category: 'Debt Repayment', description: 'Discover Personal', amount: 183}));
    // this.expenses.push(new Expense({category: 'Debt Repayment', description: 'Discover Student', amount: 50}));
    // this.expenses.push(new Expense({category: 'Debt Repayment', description: 'Great Lakes Student', amount: 233}));
    // this.budgetItems.push(
    //   {
    //     category: 'DEBT',
    //     fraction: 0.26
    //   });
    // this.budgetItems.push(
    //   {
    //     category: 'GROCERIES',
    //     fraction: 0.0458
    //   });
    // this.budgetItems.push(
    //   {
    //     category: 'EATING OUT',
    //     fraction: 0.0458
    //   });
    // this.budgetItems.forEach(
    //   item => {
    //     this.pieChartLabels.push(item.category);
    //     this.pieChartData.push(item.fraction * 100);
    //   }
    // );
  }

  ngOnInit() {
    this.budgetService.loadBudget().subscribe(
      (budget: Budget) => {
        console.log(budget);
        this.budget = budget;
      });
    this.budgetService.budgetSubject.subscribe(
      (budget: Budget) => {
        this.budget = budget;
      });
    this.recurringExpFormGroup = new FormGroup({
      category: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.maxLength(100)]),
      amount: new FormControl(null, Validators.required)
    });
    this.budgetItemFormGroup = new FormGroup({
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

  onAddBudgetItem() {
    console.log(this.budgetItemFormGroup);
    const item: BudgetItem = new BudgetItem(this.budgetItemFormGroup.value);
    this.budgetService.post(item, this.budget.id).subscribe(
      (budgItem: BudgetItem) => {
        this.budget.items.push(budgItem);
        this.budgetItems = [...this.budgetItems]; // TODO: Consider making sum pipe impure instead of triggering it via deep copy
      }
    );
    this.budgetItemFormGroup.reset();
  }
}
