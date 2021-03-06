import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from './expense.model';
import { WalletService } from './wallet.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';
import { Wallet } from './wallet.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  httpOptions: { headers: HttpHeaders };
  private expenses: Expense[] = [];
  expensesSubject: Subject<Expense[]> = new Subject<Expense[]>();
  authSub: Subscription;

  constructor(private http: HttpClient, private authService: AuthService, private walletService: WalletService) {
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
    this.walletService.walletSubject.subscribe(
      (wallet: Wallet) => {
        this.expenses = this.expensesToArray(wallet);
        this.expensesSubject.next(this.expenses);
      }
    );
  }

  private expensesToArray(wallet: Wallet): Expense[] {
    const expenses = [];
    wallet.checkingAccounts.forEach(acct => { expenses.push(...acct.expenses); });
    wallet.creditCards.forEach(acct => { expenses.push(...acct.expenses); });
    wallet.loans.forEach(acct => { expenses.push(...acct.expenses); });
    wallet.savingsAccounts.forEach(acct => { expenses.push(...acct.expenses); });
    wallet.investments.forEach(acct => { expenses.push(...acct.expenses); });

    return expenses;
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  post(expense: Expense, acctId: number): Observable<Expense> {
    return this.http.post<Expense>(AppComponent.apiBaseUrl + 'accounts/' + acctId + '/expenses', expense, this.httpOptions)
      .pipe(map(
        (exp: Expense) => exp
        )
      );
  }

  delete(expense: Expense): Observable<string> {
    return this.http.delete(AppComponent.apiBaseUrl + 'accounts/' + expense.account.id + '/expenses/' + expense.id, this.httpOptions)
      .pipe(map(
        (response: any) => response
      ));
  }
}
