import {Component, OnInit} from '@angular/core';
import {WalletService} from '../shared/wallet.service';
import {Wallet} from '../shared/wallet.model';

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
        (wallet: Wallet) => {
          this.wallet = wallet;
          console.log('walletSubscription: ' + this.wallet);
        }
      );
    console.log('ngOnInit: ' + this.wallet);
  }
}
