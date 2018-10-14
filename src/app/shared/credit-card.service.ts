import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { WalletService } from './wallet.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { AppComponent } from '../app.component';
import { Wallet } from './wallet.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CreditCard } from './credit-card.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  httpOptions: { headers: HttpHeaders };
  private accounts: CreditCard[] = [];
  accountsSubject: Subject<CreditCard[]> = new Subject<CreditCard[]>();
  authSub: Subscription;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private walletService: WalletService) {
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

  post(account: CreditCard): Observable<CreditCard[]> {
    return this.http.post<CreditCard[]>(AppComponent.apiBaseUrl + 'credit', account, this.httpOptions)
      .pipe(map(
        (accounts: CreditCard[]) => accounts
        )
      );
  }
}
