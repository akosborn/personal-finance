import { Injectable } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { SavingsAccount } from './SavingsAccount';
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

  httpOptions: { headers: HttpHeaders };
  private accounts: SavingsAccount[] = [];
  accountsSubject: Subject<SavingsAccount[]> = new Subject<SavingsAccount[]>();
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

  post(account: SavingsAccount): Observable<SavingsAccount[]> {
    return this.http.post<SavingsAccount[]>(AppComponent.apiBaseUrl + 'savings', account, this.httpOptions)
      .pipe(map(
        (accounts: SavingsAccount[]) => accounts
        )
      );
  }
}
