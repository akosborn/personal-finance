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
              'Authorization': user.tokenId
            })
          };
          // Push updated wallet
          this.loadWallet().subscribe(
            (wallet: Wallet) => this.walletSubject.next(wallet)
          );
        }
      }
    );

    this.walletSubject.subscribe(
      (wallet: Wallet) => {
        this.wallet = wallet;
      }
    );
  }

  loadWallet(): Observable<Wallet> {
    return this.http.get<any>(AppComponent.apiBaseUrl + 'wallet', this.httpOptions)
      .pipe(map(
        // API returns accounts in a single indiscriminate list
        (response) => {
          const checkingAccts = response.accounts.filter(
            acct => acct.type.toLowerCase() === 'checking'
          );
          const savingsAccts = response.accounts.filter(
            acct => acct.type.toLowerCase() === 'savings'
          );
          const loans = response.accounts.filter(
            acct => acct.type.toLowerCase() === 'loan'
          );
          const creditCards = response.accounts.filter(
            acct => acct.type.toLowerCase() === 'credit_card'
          );
          const investments = response.accounts.filter(
            acct => acct.type.toLowerCase() === 'investment'
          );
          return new Wallet(
            response.id, response.userId, response.name, response.description,
            checkingAccts, savingsAccts, loans, creditCards, investments);
        }
      ));
  }

  getWallet(): Wallet {
    return this.wallet;
  }
}
