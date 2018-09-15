import {Component, OnDestroy, OnInit} from '@angular/core';
import {WalletService} from '../shared/wallet.service';
import {CheckingAccount} from '../shared/checking-account.model';
import {Subscription} from 'rxjs';
import {Wallet} from '../shared/wallet.model';

@Component({
  selector: 'app-checking-accounts',
  templateUrl: './checking-accounts.component.html',
  styleUrls: ['./checking-accounts.component.css']
})
export class CheckingAccountsComponent implements OnInit, OnDestroy {
  checkingAccounts: CheckingAccount[];
  walletSubscription: Subscription;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    // check if wallet initialized
    if (this.walletService.wallet) {
      this.checkingAccounts = this.walletService.wallet.checkingAccounts;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => this.checkingAccounts = wallet.checkingAccounts
      );
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }

}