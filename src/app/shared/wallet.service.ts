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

  static jsonToWallet(response) {
    // API returns accounts in a single indiscriminate list
    let checkingAccts = [];
    let savingsAccts = [];
    let loans = [];
    let creditCards = [];
    let investments = [];

    if (response.accounts) {
      checkingAccts = response.accounts.filter(
        acct => acct.type === 'CHECKING'
      );
      savingsAccts = response.accounts.filter(
        acct => acct.type === 'SAVINGS'
      );
      loans = response.accounts.filter(
        acct => acct.type === 'LOAN'
      );
      creditCards = response.accounts.filter(
        acct => acct.type === 'CREDIT_CARD'
      );
      investments = response.accounts.filter(
        acct => acct.type === 'INVESTMENT'
      );
    }
    return new Wallet(
      response.id, response.userId, response.name, response.description, response.weeklyIncome,
      checkingAccts, savingsAccts, loans, creditCards, investments, response.annualIncome);
  }

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

  refreshWallet(): void {
    this.loadWallet().subscribe(
      (wallet: Wallet) => this.walletSubject.next(wallet)
    );
  }

  loadWallet(): Observable<Wallet> {
    return this.http.get<any>(AppComponent.apiBaseUrl + 'wallet', this.httpOptions)
      .pipe(map(
        (response) => {
          return WalletService.jsonToWallet(response);
        }
      ));
  }

  getWallet(): Wallet {
    return this.wallet;
  }

  updateWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.put(AppComponent.apiBaseUrl + 'wallet', wallet, this.httpOptions)
      .pipe(map(
        (response) => WalletService.jsonToWallet(response)
        ));
  }
}
