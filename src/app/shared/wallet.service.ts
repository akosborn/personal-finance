import { Injectable } from '@angular/core';
import { Wallet } from './wallet.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class WalletService {
  private static baseUrl = 'http://localhost:8080/api/';
  private wallet: Wallet;
  private walletSubject: Subject<Wallet> = new Subject<Wallet>();

  constructor(private http: HttpClient) { }

  getWalletSubject(): Subject<Wallet> {
    return this.walletSubject;
  }

  getWallet(): Wallet {
    this.http.get(WalletService.baseUrl + 'wallet')
      .pipe(
        map(
          (wallet: any) => {
            console.log(wallet);
          return wallet;
          }
        )
      )
      .subscribe(
        (wallet: Wallet) => {
          this.wallet = wallet;
          this.walletSubject.next(wallet);
        }
      );
    return this.wallet;
  }

  updateWallet(wallet: Wallet) {
    this.wallet = wallet;
    this.walletSubject.next(wallet);
  }
}
