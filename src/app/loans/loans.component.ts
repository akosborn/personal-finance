import { Component, OnInit } from '@angular/core';
import {WalletService} from '../shared/wallet.service';
import {Loan} from '../shared/Loan';
import {Subscription} from 'rxjs';
import {Wallet} from '../shared/wallet.model';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  loans: Loan[];
  walletSubscription: Subscription;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    if (this.walletService.getWallet()) {
      this.loans = this.walletService.getWallet().loans;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => this.loans = wallet.loans
      );
  }

}
