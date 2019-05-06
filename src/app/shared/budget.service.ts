import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { Budget } from './budget.model';
import { BudgetItem } from './budget-item.model';
import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  httpOptions: { headers: HttpHeaders };
  private budget: Budget;
  budgetSubject: Subject<Budget> = new Subject<Budget>();
  authSub: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authSub = this.authService.authState.subscribe(
      (user: SocialUser) => {
        if (user) {
          this.httpOptions = {
            headers: new HttpHeaders({
              'Authorization': user.tokenId
            })
          };
        }
      }
    );
    this.budgetSubject.subscribe(
      (budget: Budget) => this.budget = budget
    );
  }

  getBudget(): Budget {
    return this.budget;
  }

  loadBudget(): Observable<Budget> {
    return this.http.get<Budget>(AppComponent.apiBaseUrl + 'budget', this.httpOptions)
      .pipe(map(
        (response: any) => {
          const items: BudgetItem[] = [];
          for (const item of response.items) {
            const it: BudgetItem = new BudgetItem();
            it.id = item.id;
            it.budgetId = item.budget.id;
            it.amount = item.amount;
            it.category = item.category.name;
            it.description = item.description;
            items.push(it);
          }
          return new Budget(response.id, response.user.id, items);
        }
      ));
  }

  post(budgetItem: BudgetItem, budgetAcctId: number): Observable<BudgetItem> {
    return this.http.post<BudgetItem>(AppComponent.apiBaseUrl + 'budget/' + budgetAcctId, budgetItem, this.httpOptions)
      .pipe(map(
        (item: any) => {
          const it: BudgetItem = new BudgetItem();
          it.id = item.id;
          it.budgetId = item.budget.id;
          it.amount = item.amount;
          it.category = item.category.name;
          it.description = item.description;
          return it;
        }
        )
      );
  }

  // Deletes a single BudgetItem from a Budget
  delete(budgetId: number, itemId: number): Observable<string> {
    return this.http.delete(AppComponent.apiBaseUrl + 'budget/' + budgetId + '/items/' + itemId, this.httpOptions)
      .pipe(map(
        (response: any) => response
      ));
  }

  updateItem(item: {}, budgetId: number, itemId: number): Observable<BudgetItem> {
    return this.http.patch(AppComponent.apiBaseUrl + 'budget/' + budgetId + '/items/' + itemId, item, this.httpOptions)
      .pipe(map(
        (response: any) => {
          const it: BudgetItem = new BudgetItem();
          it.id = response.id;
          it.budgetId = response.budget.id;
          it.amount = response.amount;
          it.category = response.category.name;
          it.description = response.description;
          return it;
        }));
  }
}
