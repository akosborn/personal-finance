import {Injectable, OnInit} from '@angular/core';
import { Wallet } from './wallet.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AppComponent} from '../app.component';

@Injectable()
export class WalletService implements OnInit {
  wallet: Wallet;
  walletSubject: Subject<Wallet> = new Subject<Wallet>();
  walletSubscription: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.walletSubscription = this.walletSubject
      .subscribe(
        (wallet: Wallet) => this.wallet = wallet
      );
  }

  getWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(AppComponent.apiBaseUrl + 'wallet')
      .pipe(map(
        (data: Wallet) =>
          this.wallet = new Wallet(
            data.id, data.name, data.description, data.checkingAccounts, data.savingsAccounts,
            data.loans, data.creditCards, data.investments)
      ));
  }

  login() {
    const headers = new HttpHeaders({'x-auth-token': this.getCookie('AUTH-TOKEN')});
    console.log(headers);
    return this.http.get('http://localhost:8080/api/user/current', {headers: headers})
      .subscribe(
        (data: any) => console.log(data),
        (error: Error) => console.log(error)
      );
  }

  getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
}
