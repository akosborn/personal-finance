import {Component, OnDestroy, OnInit} from '@angular/core';
import {Investment} from '../shared/investment.model';
import {Subscription} from 'rxjs';
import {WalletService} from '../shared/wallet.service';
import {Wallet} from '../shared/wallet.model';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit, OnDestroy {
  investments: Investment[];
  walletSubscription: Subscription;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    if (this.walletService.wallet){
      this.investments = this.walletService.wallet.investments;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => this.investments = wallet.investments
      );
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }

}
