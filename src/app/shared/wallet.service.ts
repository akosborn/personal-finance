import {Injectable, OnInit} from '@angular/core';
import { Wallet } from './wallet.model';
import {Observable, Subject, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class WalletService implements OnInit {
  private static baseUrl = 'http://localhost:8080/api/';
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
    return this.http.get<Wallet>(WalletService.baseUrl + 'wallets')
      .pipe(map(
        (data: Wallet) =>
          this.wallet = new Wallet(
            data.id, data.name, data.description, data.checkingAccounts, data.savingsAccounts,
            data.loans, data.creditCards, data.investments)
      ));
  }
}
