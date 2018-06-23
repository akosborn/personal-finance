import {Injectable, OnInit} from '@angular/core';
import { Wallet } from './wallet.model';
import {Observable, Subject, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
}
