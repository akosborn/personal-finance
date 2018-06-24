import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreditCard} from '../shared/credit-card.model';
import {Subscription} from 'rxjs';
import {WalletService} from '../shared/wallet.service';
import {Wallet} from '../shared/wallet.model';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.css']
})
export class CreditCardsComponent implements OnInit, OnDestroy {
  creditCards: CreditCard[];
  walletSubscription: Subscription;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    // check if wallet initialized
    if (this.walletService.wallet) {
      this.creditCards = this.walletService.wallet.creditCards;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => this.creditCards = wallet.creditCards
      );
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }
}

