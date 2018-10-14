import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { CheckingAccount } from './checking-account.model';
import { AuthService, SocialUser } from 'angularx-social-login';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { AccountModel } from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  httpOptions: { headers: HttpHeaders };
  private accounts: CheckingAccount[] = [];
  accountsSubject: Subject<CheckingAccount[]> = new Subject<CheckingAccount[]>();
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
  }

  post(account: AccountModel): Observable<AccountModel> {
    return this.http.post<AccountModel>(AppComponent.apiBaseUrl + 'accounts', account, this.httpOptions)
      .pipe(map(
          (acct: AccountModel) => acct
        )
      );
  }
}
