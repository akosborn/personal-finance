import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../shared/expense.service';
import {Expense} from '../shared/expense.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  expenses: Expense[];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.getExpenses()
      .subscribe(
        (expenses: Expense[]) => this.expenses = expenses
      );
  }

}
