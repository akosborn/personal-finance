import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletService } from '../shared/wallet.service';
import { SavingsAccount } from '../shared/SavingsAccount';
import { Subscription } from 'rxjs';
import { Wallet } from '../shared/wallet.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SavingsService } from '../shared/savings.service';

@Component({
  selector: 'app-savings-accounts',
  templateUrl: './savings-accounts.component.html',
  styleUrls: ['./savings-accounts.component.css']
})
export class SavingsAccountsComponent implements OnInit, OnDestroy {

  wallet: Wallet;
  savingsAccounts: SavingsAccount[];
  walletSubscription: Subscription;
  accountFormGroup: FormGroup;

  constructor(private walletService: WalletService,
              private savingsService: SavingsService) { }

  ngOnInit() {
    // check if wallet initialized
    if (this.walletService.getWallet()) {
      this.wallet = this.walletService.getWallet();
      this.savingsAccounts = this.walletService.getWallet().savingsAccounts;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => {
          this.wallet = wallet;
          this.savingsAccounts = this.wallet.savingsAccounts;
        }
      );

    this.accountFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.maxLength(100)]),
      balance: new FormControl(null, Validators.required),
      interestRate: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const account: SavingsAccount = new SavingsAccount(this.accountFormGroup.value);
    this.savingsService.post(account).subscribe(
      (accounts: SavingsAccount[]) => {
        this.wallet.savingsAccounts = accounts;
        this.walletService.walletSubject.next(this.wallet);
      }
    );
    this.accountFormGroup.reset();
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }
}
