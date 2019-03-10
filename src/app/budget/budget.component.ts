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
  itemsByCategory: Map<string, BudgetItem[]>;

  fixedExpFormGroup: FormGroup;
  budgetItemFormGroup: FormGroup;
  categories = [
    'Debt Repayment',
    'Emergency Fund',
    'Food',
    'Housing',
    'Investing',
    'Savings',
    'Transportation',
    'Wants'
  ];
  fixedExpenses: Expense[];
  expandedRows: string[] = [];

  // Pie
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'doughnut';
  public pieChartOptions: any =
    {
      legend:
        {
          position: 'right'
        }
    };
  showBudgetItemForm = false;
  showFixedExpenseForm = false;

  constructor(private budgetService: BudgetService, private walletService: WalletService) {
  }

  ngOnInit() {
    this.budgetService.loadBudget().subscribe(
      (budget: Budget) => {
        this.budget = budget;
        this.updateChart(this.budget.items);
        this.itemsByCategory = this.getBudgetItemsByCatgeory(this.budget.items);
      });
    this.walletSubscription = this.budgetService.budgetSubject.subscribe(
      (budget: Budget) => {
        this.budget = budget;
        this.updateChart(this.budget.items);
        this.itemsByCategory = this.getBudgetItemsByCatgeory(this.budget.items);
      });
    this.wallet = this.walletService.getWallet();
    this.walletService.walletSubject.subscribe((wallet: Wallet) => this.wallet = wallet);
    this.fixedExpFormGroup = new FormGroup({
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

  getBudgetItemsByCatgeory(items: BudgetItem[]): Map<string, BudgetItem[]> {
    const categoryMap: Map<string, BudgetItem[]> = new Map<string, BudgetItem[]>();
    for (const item of items) {
      if (categoryMap.get(item.category)) {
        categoryMap.get(item.category).push(item); // Add to list
      } else {
        categoryMap.set(item.category, [item]); // Put new category in map
      }
    }
    return categoryMap;
  }

  updateChart(items: BudgetItem[]) {
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.getChartMap(items).forEach(
      (amount: number, category: string) => {
        this.pieChartLabels.push(category);
        this.pieChartData.push(amount);
      }
    );
  }

  getChartMap(items: BudgetItem[]): Map<string, number> {
    const budgetMap: Map<string, number> = new Map<string, number>();
    for (const item of items) {
      if (budgetMap.get(item.category)) {
        // Sum items for each category
        budgetMap.set(item.category, budgetMap.get(item.category) + item.amount);
      } else {
        // Put new category in map
        budgetMap.set(item.category, item.amount);
      }
    }
    return budgetMap;
  }

  onAddFixedExpense() {
    const expense: Expense = new Expense(this.fixedExpFormGroup.value);
    this.budgetService.postFixedExpense(expense, this.budget.id).subscribe(
      (exp: Expense) => { this.budgetService.loadBudget(); }
      );
    this.fixedExpFormGroup.reset();
  }

  onAddBudgetItem(): void {
    const item: BudgetItem = new BudgetItem(this.budgetItemFormGroup.value);
    this.budgetService.post(item, this.budget.id).subscribe(
      (budgItem: BudgetItem) => {
        this.budget.items.push(budgItem);
        this.budgetItems = [...this.budgetItems]; // TODO: Consider making sum pipe impure instead of triggering it via deep copy
        this.updateChart(this.budget.items);
      }
    );
    this.budgetItemFormGroup.reset();
  }

  onDeleteItem(itemId: number): void {
    this.budgetService.delete(this.budget.id, itemId).subscribe(
      (succ: any) => {
        console.log(succ);
        this.budgetService.loadBudget().subscribe(
          (budget: Budget) => {
            this.budgetService.budgetSubject.next(budget);
          }
        );
        this.walletService.loadWallet().subscribe(
          (wallet: Wallet) => this.walletService.walletSubject.next(wallet)
        );
      },
      (err: any) => {
        // TODO: - Handle error by displaying message in view
      }
    );
  }

  showCategoryRows(id: string) {
    this.expandedRows.push(id);
  }

  hideCategoryRows(id: string) {
    this.expandedRows = this.expandedRows.filter(rowId => rowId !== id);
  }

  toggleBudgetItemForm() {
    this.showBudgetItemForm = !this.showBudgetItemForm;
  }

  toggleFixedExpenseForm() {
    this.showFixedExpenseForm = !this.showFixedExpenseForm;
  }
}
