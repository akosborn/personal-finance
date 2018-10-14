import { Injectable } from '@angular/core';
import { Wallet } from './shared/wallet.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { CheckingAccount } from './shared/checking-account.model';
import { AuthService, SocialUser } from 'angularx-social-login';
import { WalletService } from './shared/wallet.service';
import { map } from 'rxjs/operators';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class CheckingService {

  httpOptions: { headers: HttpHeaders };
  private accounts: CheckingAccount[] = [];
  accountsSubject: Subject<CheckingAccount[]> = new Subject<CheckingAccount[]>();
  authSub: Subscription;

  constructor(private http: HttpClient, private authService: AuthService, private walletService: WalletService) {
    this.authSub = this.authService.authState.subscribe(
      (user: SocialUser) => {
        if (user) {
          this.httpOptions = {
            headers: new HttpHeaders({
              'Authorization': user ? user.tokenId : ''
            })
          };
        }
      }
    );
  }

  post(account: CheckingAccount): Observable<CheckingAccount[]> {
    return this.http.post<CheckingAccount[]>(AppComponent.apiBaseUrl + 'checking', account, this.httpOptions)
      .pipe(map(
          (accounts: CheckingAccount[]) => accounts
        )
      );
  }
}
