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
        this.expenses = [];
        wallet.checkingAccounts.forEach(
          acct => {
            this.expenses.push(...acct.expenses);
            this.expensesSubject.next(this.expenses);
          }
        );
        //  TODO: - Add other accounts' expenses to array
      }
    );
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  post(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(AppComponent.apiBaseUrl + 'accounts/' + expense.accountId, expense, this.httpOptions)
      .pipe(map(
        (exp: Expense) => exp
        )
      );
  }
}
