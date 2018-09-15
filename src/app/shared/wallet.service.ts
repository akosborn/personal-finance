import { Injectable } from '@angular/core';
import { Wallet } from './wallet.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { AuthService } from 'angularx-social-login';

@Injectable()
export class WalletService {

  httpOptions: { headers: HttpHeaders };
  wallet: Wallet;
  walletSubject: Subject<Wallet> = new Subject<Wallet>();
  walletSubscription: Subscription;
  authSub: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.walletSubscription = this.walletSubject
      .subscribe(
        wallet => this.wallet = wallet,
        error => console.log(error + ' error. RIP subscription'),
      );
    this.authSub = this.authService.authState.subscribe(
      (socialUser) => {
        console.log(socialUser);
        this.httpOptions = {
          headers: new HttpHeaders({
            'Authorization': socialUser ? socialUser.tokenId : ''
          })
        };
      }
    );
  }

  getWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(AppComponent.apiBaseUrl + 'wallet', this.httpOptions)
      .pipe(map(
        (data: Wallet) =>
          this.wallet = new Wallet(
            data.id, data.name, data.description, data.checkingAccounts, data.savingsAccounts,
            data.loans, data.creditCards, data.investments)
      ));
  }
}
