import {Component, OnInit} from '@angular/core';
import {WalletService} from '../shared/wallet.service';
import {Wallet} from '../shared/wallet.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private wallet: Wallet;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    this.wallet = this.walletService.getWallet();
    this.walletService.getWalletSubject()
      .subscribe(
        (wallet: Wallet) => {
          this.wallet = wallet;
        }
      );
  }
}
