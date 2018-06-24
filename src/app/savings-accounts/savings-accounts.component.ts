import {Component, OnDestroy, OnInit} from '@angular/core';
import {WalletService} from '../shared/wallet.service';
import {SavingsAccount} from '../shared/SavingsAccount';
import {Subscription} from 'rxjs';
import {Wallet} from '../shared/wallet.model';

@Component({
  selector: 'app-savings-accounts',
  templateUrl: './savings-accounts.component.html',
  styleUrls: ['./savings-accounts.component.css']
})
export class SavingsAccountsComponent implements OnInit, OnDestroy {
  savingsAccounts: SavingsAccount[];
  walletSubscription: Subscription;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    if (this.walletService.wallet) {
      this.savingsAccounts = this.walletService.wallet.savingsAccounts;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => this.savingsAccounts = wallet.savingsAccounts
      );
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }
}
