import { Component, OnInit } from '@angular/core';
import { Expense } from '../shared/expense.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../shared/budget.service';
import { BudgetItem } from '../shared/budget-item.model';
import { WalletService } from '../shared/wallet.service';
import { Wallet } from '../shared/wallet.model';
import { Subscription } from 'rxjs';
import { Budget } from '../shared/budget.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  wallet: Wallet;
  budgetSubscription: Subscription;

  monthlyNetIncome: number;

  expenses: Expense[] = [];
  budget: Budget;
  itemsByCategory: Map<string, BudgetItem[]>;

  budgetItemFormGroup: FormGroup;
  budgetItemEditFormGroup: FormGroup;
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
  showEditBudgetItemForm = false;

  constructor(private budgetService: BudgetService,
              private walletService: WalletService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.budgetService.loadBudget().subscribe(
      (budget: Budget) => {
        this.budget = budget;
        this.updateChart(this.budget.items);
        this.itemsByCategory = this.getBudgetItemsByCatgeory(this.budget.items);
      });
    this.budgetSubscription = this.budgetService.budgetSubject.subscribe(
      (budget: Budget) => {
        this.budget = budget;
        this.updateChart(this.budget.items);
        this.itemsByCategory = this.getBudgetItemsByCatgeory(this.budget.items);
      });
    this.wallet = this.walletService.getWallet();
    this.monthlyNetIncome = this.wallet.annualIncome / 12;
    this.walletService.walletSubject.subscribe((wallet: Wallet) => this.wallet = wallet);
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

  onAddBudgetItem(): void {
    const item: BudgetItem = new BudgetItem(this.budgetItemFormGroup.value);
    this.budgetService.post(item, this.budget.id).subscribe(
      (budgItem: BudgetItem) => {
        this.budgetService.loadBudget().subscribe(
          (budget: Budget) => {
            this.budgetService.budgetSubject.next(budget);
          }
        );
      }
    );
    this.budgetItemFormGroup.reset();
  }

  onDeleteItem(itemId: number): void {
    this.budgetService.delete(this.budget.id, itemId).subscribe(
      (succ: any) => {
        console.log(succ);
        this.budgetService.loadBudget().subscribe(
          (budget: Budget) => this.budgetService.budgetSubject.next(budget)
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

  onEditItem(item: BudgetItem) {
    this.budgetItemEditFormGroup = new FormGroup({
      id: new FormControl(item.id),
      category: new FormControl(item.category, [Validators.required]),
      description: new FormControl(item.description, [Validators.maxLength(100)]),
      amount: new FormControl(item.amount, Validators.required)
    });
    this.showEditBudgetItemForm = true;
  }

  toggleEditItemForm() {
    this.showEditBudgetItemForm = !this.showEditBudgetItemForm;
  }

  onSaveItemEdit() {
    const itemId = this.budgetItemEditFormGroup.value.id;
    const partialItem: {} = this.getDirtyValues(this.budgetItemEditFormGroup);
    if (partialItem) { // Only PATCH if any values changed
      this.budgetService.updateItem(partialItem, this.budget.id, itemId).subscribe(
        (item: BudgetItem) => {
          this.toastrService.success('Updated ' + item.description, 'Success', {positionClass: 'toast-bottom-right'});
          this.budgetItemEditFormGroup.reset();
          this.toggleEditItemForm();
          this.budgetService.loadBudget().subscribe(
            (budget: Budget) => this.budgetService.budgetSubject.next(budget));
        },
        (err: HttpErrorResponse) => {
          this.toastrService.error(err.statusText, 'Oops!', {positionClass: 'toast-bottom-right'});
        }
      );
    }
  }

  // Returns only the fields in a form that have been modified
  getDirtyValues(form: any) {
    const dirtyValues = {};
    Object.keys(form.controls)
      .forEach(key => {
        const currentControl = form.controls[key];
        if (currentControl.dirty) {
          if (currentControl.controls) {
            dirtyValues[key] = this.getDirtyValues(currentControl);
          } else {
            dirtyValues[key] = currentControl.value;
          }
        }
      });
    return dirtyValues;
  }
}
