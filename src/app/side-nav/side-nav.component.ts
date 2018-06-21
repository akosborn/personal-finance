import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {SideNavToggleService} from '../shared/side-nav-toggle.service';
import {Wallet} from '../shared/wallet.model';
import {WalletService} from '../shared/wallet.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  wallet: Wallet;
  private walletSubscription: Subscription;
  private collapsed;
  private screenWidth;
  @HostListener('window:resize', ['$event']) onResize(event?) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 767) {
      this.sideNavToggleService.setCollapsed(false);
    } else {
      this.sideNavToggleService.setCollapsed(true);
    }
  }

  constructor(private sideNavToggleService: SideNavToggleService,
              private walletService: WalletService) { }

  ngOnInit() {
    this.onResize();
    this.collapsed = this.sideNavToggleService.isCollapsed();
    this.sideNavToggleService.collapsedChanged
      .subscribe(
        (collapsed: boolean) => this.collapsed = collapsed
      );

    // get wallet from server
    this.walletService.getWallet()
      .subscribe(
        (wallet: Wallet) => {
          this.wallet = wallet;
          this.walletService.walletSubject
            .next(this.wallet);
        }
      );
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => this.wallet = wallet
      );
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }
}
