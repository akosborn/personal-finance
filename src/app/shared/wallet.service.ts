import { Injectable } from '@angular/core';
import { Wallet } from './wallet.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WalletService {
  private static baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(WalletService.baseUrl + 'wallet');
  }
}
