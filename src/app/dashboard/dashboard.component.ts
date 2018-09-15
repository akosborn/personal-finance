import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletService } from '../shared/wallet.service';
import { Wallet } from '../shared/wallet.model';
import { Subscription } from 'rxjs';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  wallet: Wallet;
  private walletSubscription: Subscription;
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private walletService: WalletService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe(
      (user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if (this.loggedIn) {
          this.getWallet();
        } else {
          this.wallet = null;
        }
      });

    this.walletService.getWallet().subscribe(
      (wallet: Wallet) => this.wallet = wallet
    );
  }

  getWallet() {
    this.walletService.getWallet().subscribe(
      (wallet: Wallet) => this.wallet = wallet
    );
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }
}
