import {Component, OnDestroy, OnInit} from '@angular/core';
import { WalletService } from '../shared/wallet.service';
import { Wallet } from '../shared/wallet.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  wallet: Wallet;
  private walletSubscription: Subscription;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    this.wallet = this.walletService.wallet;
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => this.wallet = wallet
      );
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }

  onLogin() {
    this.walletService.login();
  }
}
