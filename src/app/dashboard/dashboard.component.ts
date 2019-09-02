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
  private user: SocialUser;
  private loggedIn: boolean;
  private authSub: Subscription;

  // Pie
  public pieChartLabels: string[] = ['Groceries', 'Wants', 'Debt Payment', 'Investments'];
  public pieChartData: number[] = [10, 30, 30, 15];
  public pieChartType = 'doughnut';

  constructor(private walletService: WalletService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authSub = this.authService.authState.subscribe(
      (user) => {
        this.user = user;
        this.loggedIn = (user != null);
      });

    this.wallet = this.walletService.getWallet();
    this.walletService.walletSubject.subscribe(
      (wallet: Wallet) => this.wallet = wallet
    );
  }

  refreshWallet() {
    this.walletService.loadWallet().subscribe(
      (wallet: Wallet) => this.wallet = wallet
    );
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
