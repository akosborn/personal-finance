import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WalletService } from '../shared/wallet.service';
import { Wallet } from '../shared/wallet.model';
import { Subscription } from 'rxjs';
import { forbiddenValueValidator } from '../shared/forbidden-value.directive';

@Component({
  selector: 'app-wallet-settings',
  templateUrl: './wallet-settings.component.html',
  styleUrls: ['./wallet-settings.component.css']
})
export class WalletSettingsComponent implements OnInit, OnDestroy {
  incomeFormCtl: FormControl;
  wallet: Wallet;
  walletSubscription: Subscription;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    this.wallet = this.walletService.getWallet();
    this.incomeFormCtl = new FormControl(
      this.wallet.annualIncome,
      [Validators.required, forbiddenValueValidator(this.wallet.annualIncome)]);
    this.walletSubscription = this.walletService.walletSubject.subscribe((wallet: Wallet) => this.wallet = wallet);
  }

  onUpdateIncome() {
    this.wallet.annualIncome = this.incomeFormCtl.value;
    this.walletService.updateWallet(this.wallet).subscribe(
      (wallet: Wallet) => {
        this.walletService.walletSubject.next(wallet);
        // Creating a new FormControl to update forbiddenValueValidator() with the new income value
        this.incomeFormCtl = new FormControl(
          this.wallet.annualIncome,
          [Validators.required, forbiddenValueValidator(this.wallet.annualIncome)]);
      }
    );
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }
}
