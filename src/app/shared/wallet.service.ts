import {Injectable, OnInit} from '@angular/core';
import {Wallet} from './wallet.model';
import {Subject} from 'rxjs';

@Injectable()
export class WalletService {
  private wallet: Wallet = new Wallet(1250.6, 265.73, 24000.30);
  private walletChanged = new Subject<Wallet>();

  constructor() { }

  getWallet(): Wallet {
    return this.wallet;
  }

  updateWallet(wallet: Wallet) {
    this.wallet = wallet;
    this.walletChanged.next(wallet);
  }
}
