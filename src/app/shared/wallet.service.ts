import { Injectable } from '@angular/core';
import { Wallet } from './wallet.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class WalletService {
  private static baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getWallet(): Observable<Wallet> {
    return this.http.get(WalletService.baseUrl + 'wallet')
      .pipe(
        map(
          (wallet: Wallet) => {
            return wallet;
          }
        )
      );
  }
}
