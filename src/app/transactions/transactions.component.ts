import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../shared/expense.service';
import { Expense } from '../shared/expense.model';
import { Wallet } from '../shared/wallet.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../shared/wallet.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  wallet: Wallet;
  expenses: Expense[] = [];
  walletSubscription: Subscription;
  expenseFormGroup: FormGroup;

  constructor(private walletService: WalletService,
              private expenseService: ExpenseService) { }

  ngOnInit() {
    // check if wallet initialized
    if (this.walletService.getWallet()) {
      this.wallet = this.walletService.getWallet();
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => {
          this.wallet = wallet;
        });

    this.expenses = this.expenseService.getExpenses();
    this.expenseService.expensesSubject.subscribe(
      (expenses: Expense[]) => this.expenses = expenses
    );

    this.expenseFormGroup = new FormGroup({
      description: new FormControl(null, [Validators.maxLength(100)]),
      amount: new FormControl(null, Validators.required),
      accountId: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    const expense = this.expenseFormGroup.value;
    this.expenseService.post(expense)
      .subscribe(
        (exp: Expense) => {
          this.expenses.push(exp);
          this.walletService.refreshWallet();
        }
      );
  }
}
