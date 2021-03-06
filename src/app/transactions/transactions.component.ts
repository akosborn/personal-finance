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
      account: new FormGroup({
        id: new FormControl(null, Validators.required)
      })
    });
  }

  onSubmit(): void {
    const acctId = this.expenseFormGroup.get('account').value.id;
    const expense = new Expense(this.expenseFormGroup.value);
    expense.account = null;
    this.expenseService.post(expense, acctId)
      .subscribe(
        (exp: Expense) => {
          this.expenses.push(exp);
          this.walletService.refreshWallet();
          this.expenseFormGroup.reset();
        }
      );
  }

  onDeleteExpense(expense: Expense) {
    this.expenseService.delete(expense).subscribe(
      (succ: any) => {
        this.walletService.loadWallet().subscribe(
          (wallet: Wallet) => this.walletService.walletSubject.next(wallet)
        );
      },
      (err: any) => {
        // TODO: - Handle error by displaying message in view
        console.log(err.message);
      }
    );
  }
}
