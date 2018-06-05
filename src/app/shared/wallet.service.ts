import {Injectable} from '@angular/core';
import {Wallet} from './wallet.model';
import {Subject} from 'rxjs';

@Injectable()
export class WalletService {
  private wallet: Wallet = new Wallet(1250.6, 265.73, 24000.30);
  private walletSubject: Subject<Wallet> = new Subject<Wallet>();

  constructor() { }

  getWalletSubject(): Subject<Wallet> {
    return this.walletSubject;
  }

  getWallet(): Wallet {
    return this.wallet;
  }

  updateWallet(wallet: Wallet) {
    this.wallet = wallet;
    this.walletSubject.next(wallet);
  }
}
