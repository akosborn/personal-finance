import { Component, HostListener, OnInit } from '@angular/core';
import { SideNavToggleService } from '../shared/side-nav-toggle.service';
import { Wallet } from '../shared/wallet.model';
import { WalletService } from '../shared/wallet.service';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  wallet: Wallet;
  private collapsed;
  private screenWidth;
  private isLoggedIn: boolean;
  @HostListener('window:resize', ['$event']) onResize(event?) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 767) {
      this.sideNavToggleService.setCollapsed(false);
    } else {
      this.sideNavToggleService.setCollapsed(true);
    }
  }

  constructor(private sideNavToggleService: SideNavToggleService,
              private walletService: WalletService,
              private authService: AuthService) { }

  ngOnInit() {
    this.onResize();
    this.collapsed = this.sideNavToggleService.isCollapsed();
    this.sideNavToggleService.collapsedChanged
      .subscribe(
        (collapsed: boolean) => this.collapsed = collapsed
      );
    this.authService.authState.subscribe((user: SocialUser) => {
      this.isLoggedIn = (user != null);
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
}
