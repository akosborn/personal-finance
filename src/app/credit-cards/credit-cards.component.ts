import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreditCard } from '../shared/credit-card.model';
import { Subscription } from 'rxjs';
import { WalletService } from '../shared/wallet.service';
import { Wallet } from '../shared/wallet.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreditCardService } from '../shared/credit-card.service';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.css']
})
export class CreditCardsComponent implements OnInit, OnDestroy {

  wallet: Wallet;
  creditCards: CreditCard[];
  walletSubscription: Subscription;
  accountFormGroup: FormGroup;

  constructor(private walletService: WalletService,
              private creditCardService: CreditCardService) { }

  ngOnInit() {
    // check if wallet initialized
    if (this.walletService.getWallet()) {
      this.wallet = this.walletService.getWallet();
      this.creditCards = this.walletService.getWallet().creditCards;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => {
          this.wallet = wallet;
          this.creditCards = this.wallet.creditCards;
        }
      );

    this.accountFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.maxLength(100)]),
      balance: new FormControl(null, Validators.required),
      limitAmt: new FormControl(null, Validators.required),
      minPayment: new FormControl(null, Validators.required),
      interestRate: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const account: CreditCard = this.accountFormGroup.value;
    this.creditCardService.post(account).subscribe(
      (accounts: CreditCard[]) => {
        this.wallet.creditCards = accounts;
        this.walletService.walletSubject.next(this.wallet);
      }
    );
    this.accountFormGroup.reset();
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }
}

