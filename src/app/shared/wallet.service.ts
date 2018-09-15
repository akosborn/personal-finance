import { Injectable } from '@angular/core';
import { Wallet } from './wallet.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { AuthService, SocialUser } from 'angularx-social-login';

@Injectable()
export class WalletService {

  httpOptions: { headers: HttpHeaders };
  private wallet: Wallet;
  walletSubject: Subject<Wallet> = new Subject<Wallet>();
  authSub: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authSub = this.authService.authState.subscribe(
      (user: SocialUser) => {
        if (user) {
          this.httpOptions = {
            headers: new HttpHeaders({
              'Authorization': user ? user.tokenId : ''
            })
          };
          // Push updated wallet
          this.loadWallet().subscribe(
            (wallet: Wallet) => this.walletSubject.next(wallet)
          );
        }
      }
    );
  }

  loadWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(AppComponent.apiBaseUrl + 'wallet', this.httpOptions)
      .pipe(map(
        (data: Wallet) =>
          new Wallet(
            data.id, data.name, data.description, data.checkingAccounts, data.savingsAccounts,
            data.loans, data.creditCards, data.investments)
      ));
  }

  getWallet(): Wallet {
    return this.wallet;
  }
}
