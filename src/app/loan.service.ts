import { Injectable } from '@angular/core';
import { SavingsAccount } from './shared/SavingsAccount';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loan } from './shared/Loan';
import { WalletService } from './shared/wallet.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Wallet } from './shared/wallet.model';
import { AppComponent } from './app.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  httpOptions: { headers: HttpHeaders };
  private accounts: Loan[] = [];
  accountsSubject: Subject<Loan[]> = new Subject<Loan[]>();
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
          // Push updated wallet
          this.walletService.loadWallet().subscribe(
            (wallet: Wallet) => this.walletService.walletSubject.next(wallet)
          );
        }
      }
    );
  }

  post(account: Loan): Observable<Loan[]> {
    return this.http.post<Loan[]>(AppComponent.apiBaseUrl + 'loans', account, this.httpOptions)
      .pipe(map(
        (accounts: Loan[]) => accounts
        )
      );
  }
}
