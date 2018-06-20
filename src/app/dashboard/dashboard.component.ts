import { Component, OnInit } from '@angular/core';
import { WalletService } from '../shared/wallet.service';
import { Wallet } from '../shared/wallet.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  wallet: Wallet;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    this.walletService.getWallet()
      .subscribe(
        (data: Wallet) => {
          this.wallet = new Wallet(
            data.id, data.name, data.description, data.checkingAccounts, data.savingsAccounts,
            data.loans, data.creditCards, data.investments
          );
        }
      );
  }
}
